import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HomeIcon = ({ color, ...props }: { color?: string | null }) => (
	<Svg
		id="Home"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<Path
			d="M9.15713 18.7714V17.7047C9.15712 16.9246 9.79304 16.2908 10.5809 16.2856H13.467C14.2587 16.2856 14.9004 16.9209 14.9004 17.7047V20.7809C14.9002 21.4432 15.4342 21.9845 16.103 22H18.027C19.945 22 21.4999 20.4607 21.4999 18.5618V9.83784C21.4897 9.09083 21.1354 8.38935 20.5379 7.93303L13.9576 2.6853C12.8049 1.77157 11.1661 1.77157 10.0133 2.6853L8.37549 3.99961"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M8.89696 22H5.97291C4.05488 22 2.5 20.4607 2.5 18.5618V9.84735C2.50739 9.09966 2.86226 8.39701 3.46203 7.94255L5.09987 6.62823"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
export default HomeIcon;
