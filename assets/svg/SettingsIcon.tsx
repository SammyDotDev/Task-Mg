import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SettingsIcon = ({ color, ...props }: { color?: string | null }) => (
	<Svg
		id="Setting 2"
		width={24}
		height={25}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<Path
			d="M12.2514 14.9887C10.6774 14.9887 9.40137 13.7127 9.40137 12.1387C9.40137 10.5647 10.6774 9.2887 12.2514 9.2887C13.8254 9.2887 15.1014 10.5647 15.1014 12.1387"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="square"
			strokeLinejoin="round"
		/>
		<Path
			d="M7.25 3.47864H17.25L22.25 12.1386L17.25 20.7986H7.25L2.25 12.1386L5.316 6.82764"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="square"
		/>
	</Svg>
);
export default SettingsIcon;
