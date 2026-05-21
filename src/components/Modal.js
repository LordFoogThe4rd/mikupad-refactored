import { html } from 'htm/react';
import { useEffect } from 'react';
import { SVG_Close } from './icons/index.js';

export function Modal({ isOpen, onClose, title, description, children, ...props }) {
	useEffect(() => {
		if (!isOpen) return;
		const onKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return html`
		<div className="modal-overlay" onClick=${onClose}>
			<div className="modal-container">
				<div className="modal" onClick=${(e) => e.stopPropagation()} ...${props}>
					<div class="modal-title">${title}</div>
					${ description=="" ? false : html`<div style=${{ whiteSpace: 'pre-line' }} class='modal-desc'>${description}</div>` }
					<hr/>
					<div className="modal-content">
						${children}
					</div>
					<button
					class="button-modal-top"
					onClick=${onClose}>
						<${SVG_Close}/>
					</button>
				</div>
			</div>
		</div>`;
}
