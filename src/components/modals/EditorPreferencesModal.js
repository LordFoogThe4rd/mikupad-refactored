import { html } from 'htm/react';
import { Modal } from '../Modal.js';

export function EditorPreferencesModal({ isOpen, closeModal, children }) {
	return html`
		<${Modal} isOpen=${isOpen} onClose=${closeModal}
			title="Editor Preferences"
			description=""
			style=${{ 'max-width': '35em' }}>
				<div className="vbox">
					${children}
				</div>
		</${Modal}>`;
}
