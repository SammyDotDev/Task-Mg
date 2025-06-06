import { rMS } from "@/utils/responsive_size";
import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: title */
const TimeIcon = ({ color, ...props }: { color?: string | null }) => (
	<Svg
		id="Time Circle"
		width={`${rMS(23)}px`}
		height={`${rMS(23)}px`}
		viewBox="0 0 24 24"
		{...props}
	>
		<G
			id="Iconly/Light-Outline/Time-Circle"
			stroke="none"
			strokeWidth={1.5}
			fill="none"
			fillRule="evenodd"
		>
			<G
				id="Time-Circle"
				transform="translate(2.000000, 2.000000)"
				fill={color ?? "#000000"}
			>
				<Path
					d="M10,0 C15.514,0 20,4.486 20,10 C20,15.514 15.514,20 10,20 C4.486,20 0,15.514 0,10 C0,4.486 4.486,0 10,0 Z M10,1.5 C5.313,1.5 1.5,5.313 1.5,10 C1.5,14.687 5.313,18.5 10,18.5 C14.687,18.5 18.5,14.687 18.5,10 C18.5,5.313 14.687,1.5 10,1.5 Z M9.6612,5.0954 C10.0762,5.0954 10.4112,5.4314 10.4112,5.8454 L10.4112,10.2674 L13.8162,12.2974 C14.1712,12.5104 14.2882,12.9704 14.0762,13.3264 C13.9352,13.5614 13.6862,13.6924 13.4312,13.6924 C13.3002,13.6924 13.1682,13.6584 13.0472,13.5874 L9.2772,11.3384 C9.0512,11.2024 8.9112,10.9574 8.9112,10.6934 L8.9112,5.8454 C8.9112,5.4314 9.2472,5.0954 9.6612,5.0954 Z"
					id="Combined-Shape"
				/>
			</G>
		</G>
	</Svg>
);
export default TimeIcon;
