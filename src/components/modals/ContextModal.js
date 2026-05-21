import { html } from 'htm/react';
import { Modal } from '../Modal.js';
import { CollapsibleGroup } from '../controls/CollapsibleGroup.js';

export function ContextModal({ isOpen, closeModal, tokens, memoryTokens, authorNoteTokens, handleMemoryTokensChange, finalPromptText, defaultPresets, cancel }) {
	return html`
		<${Modal} isOpen=${isOpen} onClose=${closeModal}
			title="Context"
			description="This is the prompt being sent to your large language model.">
			<div id="advancedContextPlaceholders">
			<table id="contextTokensTable" border="1" frame="void" rules="all">
				<thead>
					<tr>
						<th></th>
						<th>Memory</th>
						<th>World Info</th>
						<th>Author's Note</th>
						<th>Prompt</th>
						<th></th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Tokens</th>
						<td>${memoryTokens.tokens}</td>
						<td>${memoryTokens.tokensWI}</td>
						<td>${authorNoteTokens.tokens}</td>
						<td>${tokens - authorNoteTokens.tokens - memoryTokens.tokensWI - memoryTokens.tokens}</td>
						<td></td>
						<td>${tokens}</td>
					</tr>
				</tbody>
			</table>
			</div>
			<${CollapsibleGroup} label="Advanced Context Ordering">
				<div id="context-order-desc">
					You can use the following placeholders to order the context according to your needs:<br />
					<div id="advancedContextPlaceholders">
						<table border="1" frame="void" rules="all">
							<thead>
							<tr>
								<th></th>
								<th>Prefix</th>
								<th>Text</th>
								<th>Suffix</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<th>Memory</th>
								<td>{memPrefix}</td>
								<td>{memText}</td>
								<td>{memSuffix}</td>
							</tr>
							<tr>
								<th>World Info</th>
								<td>{wiPrefix}</td>
								<td>{wiText}</td>
								<td>{wiSuffix}</td>
							</tr>
							<tr>
								<th>Prompt</th>
								<td></td>
								<td>{prompt}</td>
								<td></td>
							</tr>
							</tbody>
						</table>
					</div>
					Any text that is not a placeholder will be added into the context as is.
				</div>
				<textarea
					readOnly=${!!cancel}
					placeholder=${defaultPresets.memoryTokens.contextOrder}
					defaultValue=${memoryTokens.contextOrder}
					value=${memoryTokens.contextOrder}
					onInput=${(e) => handleMemoryTokensChange("contextOrder", e.target.value)}
					class="expanded-text-area-settings"
					id="advanced-context-order-settings"/>
			</${CollapsibleGroup}>
			<textarea
				readOnly
				value=${finalPromptText}
				class="expanded-text-area-settings"
				id="context-area-settings" />
		</${Modal}>`;
}
