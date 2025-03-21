import * as React from "react";
import Svg, { G, Line, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const CalenderIcon = ({ color, ...props }: { color?: string | null }) => (
	<Svg id="Calendar" width="24px" height="24px" viewBox="0 0 24 24" {...props}>
		<G
			id="Iconly/Two-tone/Calendar"
			stroke="none"
			strokeWidth={1.5}
			fill="none"
			fillRule="evenodd"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<G
				id="Calendar"
				transform="translate(3.000000, 2.000000)"
				stroke={color ?? "#000000"}
				strokeWidth={1.5}
			>
				<Line
					x1={0.0926400664}
					y1={7.40425532}
					x2={17.9165888}
					y2={7.40425532}
					id="Line_200"
					opacity={0.400000006}
				/>
				<Path
					d="M13.4420736,11.3096927 L13.4513376,11.3096927 M9.00461445,11.3096927 L9.01387846,11.3096927 M4.55789127,11.3096927 L4.56715527,11.3096927 M13.4420736,15.1962175 L13.4513376,15.1962175 M9.00461445,15.1962175 L9.01387846,15.1962175 M4.55789127,15.1962175 L4.56715527,15.1962175"
					id="Combined-Shape"
					opacity={0.400000006}
				/>
				<Line
					x1={13.0437213}
					y1={-2.26485497e-14}
					x2={13.0437213}
					y2={3.29078014}
					id="Line_207"
				/>
				<Line
					x1={4.96550756}
					y1={-2.26485497e-14}
					x2={4.96550756}
					y2={3.29078014}
					id="Line_208"
				/>
				<Path
					d="M13.2382655,1.57919622 L4.77096342,1.57919622 C1.83427331,1.57919622 0,3.21513002 0,6.22222222 L0,15.2718676 C0,18.3262411 1.83427331,20 4.77096342,20 L13.2290015,20 C16.1749556,20 18,18.3546099 18,15.3475177 L18,6.22222222 C18.0092289,3.21513002 16.1842196,1.57919622 13.2382655,1.57919622 Z"
					id="Path"
				/>
			</G>
		</G>
	</Svg>
);
export default CalenderIcon;
