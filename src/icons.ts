import { AlertType } from "./types.ts";

type IconsType = Record<AlertType, string>

const icons: IconsType = {
	success: `
			<svg class="ajs__i-check" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
				<circle cx="12" cy="12" r="8" stroke="rgba(165, 220, 134, 0.3)" stroke-width="1"/>
				<path class="ajs__i-check-1" stroke="#a5dc86" stroke-linecap="round" stroke-width="1" d="M9.215 12.052l1.822 1.805 3.748-3.714" stroke-dashoffset="100" stroke-dasharray="100"/>
			</svg>
	`,
	exclamatory: `
			<svg class="ajs__i-exclamatory" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
			<g class="ajs__i-exclamatory-1">
				<circle cx="12.29" cy="12" r="8" stroke="#facea8" stroke-width="1"/>
				<path stroke="#f8bb86" stroke-linecap="round" stroke-width="1" d="M12.29 8.143v4.55"/>
				<circle cx="12.29" cy="14.957" r=".9" fill="#f8bb86"/>
	 		</g>
	 	</svg>
	`,
	danger: '',
	warning: '',
	info: ''
}

export default icons;
