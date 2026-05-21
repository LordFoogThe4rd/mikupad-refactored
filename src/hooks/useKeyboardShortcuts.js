import { useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext.js';
import { useGeneration } from '../contexts/GenerationContext.js';
import { useTTS } from './useTTS.js';
import { useGenerationLogic } from './useGenerationLogic.js';

export function useKeyboardShortcuts() {
	const { showPromptPreview } = useSettings();
	const { modalState, keyState, promptChunks, setPromptChunks, promptPreviewChunks, setPromptPreviewChunks, setPromptPreviewReroll, tokens, setTokens, cancel, toggleModal } = useGeneration();
	const { predict, undoAndPredict, undo, redo } = useGenerationLogic();
	const { ttsStop } = useTTS();

	useEffect(() => {
		function onKeyDown(e) {
			const { altKey, ctrlKey, shiftKey, key, defaultPrevented } = e;
			if (defaultPrevented)
				return;
			if (Object.values(modalState).some((s) => s))
				return;
			let preventDefaultAction = true;
			switch (`${altKey}:${ctrlKey}:${shiftKey}:${key}`) {
				case 'false:false:true:Enter':
				case 'false:true:false:Enter':
					predict();
					break;
				case 'false:false:false:Escape':
					if (cancel) {
						cancel();
					} else if (showPromptPreview && promptPreviewChunks.length !== 0) {
						setPromptPreviewChunks([]); // Discard current preview so that a new one is generated.
						setPromptPreviewReroll((r) => r + 1);
					}
					break;
				case 'false:false:false:Tab':
					if (!showPromptPreview || promptPreviewChunks.length === 0)
						break;

					setPromptChunks(p => [
						...p,
						...promptPreviewChunks
					]);
					setTokens(t => t + promptPreviewChunks.length);
					setPromptPreviewChunks([]);
					break;
				case 'false:true:false:ArrowRight':
					// Accept prompt preview word-by-word
					// by pressing Ctrl+ArrowRight.

					if (!showPromptPreview || promptPreviewChunks.length === 0)
					{
						// Fall back to default Ctrl+RightArrow behavior (move right by 1 word)
						preventDefaultAction = false;
						break;
					}

					let newPromptChunks = [ ...promptChunks ];
					let newPromptPreviewChunks = [ ...promptPreviewChunks ];
					let newTokens = tokens;

					do {
						newPromptChunks = newPromptChunks.concat(newPromptPreviewChunks.splice(0, 1));
					} while (
						// We still have suggested chunks to go through
						newPromptPreviewChunks.length > 0 &&
						// The next suggested chunk does not start with a space
						newPromptPreviewChunks[0].content[0] != " " &&
						(
							// The prompt is empty
							newPromptChunks.length == 0 ||
							// Or...
							(
								// The prompt is not empty
								newPromptChunks.length > 0 &&
								// And the new prompt does not begin with a space 
								newPromptChunks[newPromptChunks.length - 1].content[newPromptChunks[newPromptChunks.length - 1].content.length - 1] != " "
							)
						)
					)
					
					setPromptChunks(newPromptChunks);
					setPromptPreviewChunks(newPromptPreviewChunks);
					setTokens(newTokens);
					break;
				case 'false:true:false:r':
				case 'false:false:true:r':
					undoAndPredict();
					break;
				case 'false:true:false:z':
				case 'false:false:true:z':
					if (showPromptPreview) setPromptPreviewChunks([]); // Discard current preview so that a new one is generated.
					if (cancel || !undo()) return;
					break;
				case 'false:true:true:Z':
				case 'false:true:false:y':
				case 'false:false:true:y':
					if (showPromptPreview) setPromptPreviewChunks([]); // Discard current preview so that a new one is generated.
					if (cancel || !redo()) return;
					break;
				case 'false:true:false:e':
				case 'false:false:true:e':
					ttsStop();
					break;
				case 'false:true:false:f':
				case 'false:false:true:f':
					toggleModal("searchAndReplace");
					break;
				
				default:
					keyState.current = e;
					return;
			}

			if (preventDefaultAction)
				e.preventDefault();
		}
		function onKeyUp(e) {
			const { altKey, ctrlKey, shiftKey, key, defaultPrevented } = e;
			if (defaultPrevented)
				return;
			keyState.current = e;
		}

		window.addEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
			window.removeEventListener('keyup', onKeyUp)
		};
	}, [predict, cancel]);
}
