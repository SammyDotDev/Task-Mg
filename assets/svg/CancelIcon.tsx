import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CancelIcon = ({ color, ...props }: { color?: string | null }) => (
	<Svg
		id="Close Square"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<Path
			d="M14.3941 9.59485L9.60205 14.3868"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M14.3999 14.3931L9.59985 9.59314"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.75 12.0001C2.75 18.9371 5.063 21.2501 12 21.2501C18.937 21.2501 21.25 18.9371 21.25 12.0001C21.25 5.06312 18.937 2.75012 12 2.75012C5.063 2.75012 2.75 5.06312 2.75 12.0001Z"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
export default CancelIcon;
