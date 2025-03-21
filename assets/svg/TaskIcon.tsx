import * as React from "react";
import Svg, { G, Path, Polyline } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const TaskIcon = ({ color, ...props }: { color?: string | null }) => (
	<Svg
		id="Tick Square"
		width="24px"
		height="24px"
		viewBox="0 0 24 24"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		{...props}
	>
		<G
			id="Iconly/Two-tone/Tick-Square"
			stroke="none"
			strokeWidth={1.5}
			fill="none"
			fillRule="evenodd"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<G
				id="Tick-Square"
				transform="translate(2.000000, 2.000000)"
				stroke={color ?? "#000000"}
				strokeWidth={1.5}
			>
				<Path
					d="M14.3344,0.7502 L5.6654,0.7502 C2.6444,0.7502 0.7504,2.8892 0.7504,5.9162 L0.7504,14.0842 C0.7504,17.1112 2.6354,19.2502 5.6654,19.2502 L14.3334,19.2502 C17.3644,19.2502 19.2504,17.1112 19.2504,14.0842 L19.2504,5.9162 C19.2504,2.8892 17.3644,0.7502 14.3344,0.7502 Z"
					id="Stroke-1"
				/>
				<Polyline
					id="Stroke-3"
					opacity={0.400000006}
					points="6.4399 10.0002 8.8139 12.3732 13.5599 7.6272"
				/>
			</G>
		</G>
	</Svg>
);
export default TaskIcon;
