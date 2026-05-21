import { html } from 'htm/react';
import { Modal } from '../Modal.js';
import { Checkbox } from '../controls/Checkbox.js';
import { InputBox } from '../controls/InputBox.js';

export function ScreenshotModal({ isOpen, closeModal, settings }) {
	const {
		screenshotIncludeSessionName, setScreenshotIncludeSessionName,
		screenshotIncludeDate, setScreenshotIncludeDate,
		screenshotBackgroundUrl, setScreenshotBackgroundUrl,
		screenshotBackgroundColor, setScreenshotBackgroundColor,
		screenshotStoryFont, setScreenshotStoryFont,
		screenshotGeneralFont, setScreenshotGeneralFont,
		screenshotFontWeight, setScreenshotFontWeight,
		screenshotFontSize, setScreenshotFontSize,
		screenshotLineHeight, setScreenshotLineHeight,
		screenshotFontColor, setScreenshotFontColor,
		screenshotAiTextColor, setScreenshotAiTextColor,
		screenshotModelAvatarUrl, setScreenshotModelAvatarUrl
	} = settings;

	return html`
		<${Modal} isOpen=${isOpen} onClose=${closeModal}
			title="Screenshot Settings"
			style=${{ 'max-width': '35em' }}>
			<div className="vbox">
				<div className="hbox" style=${{ gap: '1em' }}>
					<${Checkbox} label="Include Session Name"
						value=${screenshotIncludeSessionName}
						onValueChange=${setScreenshotIncludeSessionName}/>
					<${Checkbox} label="Include Date"
						value=${screenshotIncludeDate}
						onValueChange=${setScreenshotIncludeDate}/>
				</div>
				<${InputBox} label="Background Image URL"
					value=${screenshotBackgroundUrl}
					onValueChange=${setScreenshotBackgroundUrl}/>
				<${InputBox} label="Background Color" type="color"
					value=${screenshotBackgroundColor}
					onValueChange=${setScreenshotBackgroundColor}/>
				<${InputBox} label="Story Text Font"
					value=${screenshotStoryFont}
					onValueChange=${setScreenshotStoryFont}/>
				<${InputBox} label="General Text Font"
					value=${screenshotGeneralFont}
					onValueChange=${setScreenshotGeneralFont}/>
				<div className="hbox" style=${{ gap: '1em' }}>
					<${InputBox} label="Font Weight"
						type="number"
						value=${screenshotFontWeight}
						onValueChange=${setScreenshotFontWeight}/>
					<${InputBox} label="Font Size (px)"
						type="number"
						value=${screenshotFontSize}
						onValueChange=${setScreenshotFontSize}/>
					<${InputBox} label="Line Height (px)"
						type="number"
						value=${screenshotLineHeight}
						onValueChange=${setScreenshotLineHeight}/>
				</div>
				<div className="hbox" style=${{ gap: '1em' }}>
					<${InputBox} label="General Text Color" type="color"
						value=${screenshotFontColor}
						onValueChange=${setScreenshotFontColor}/>
					<${InputBox} label="AI Text Color" type="color"
						value=${screenshotAiTextColor}
						onValueChange=${setScreenshotAiTextColor}/>
				</div>
				<${InputBox} label="Model Avatar URL (square preferred)"
					value=${screenshotModelAvatarUrl}
					onValueChange=${setScreenshotModelAvatarUrl}/>
			</div>
		</${Modal}>`;
}
