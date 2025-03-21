import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AddIcon = ({ color, ...props }: { color?: string | null }) => (
	<Svg
		id="Plus"
		width={24}
		height={24}
		viewBox="0 0 24 24"
		fill="none"
		{...props}
	>
		<Path
			d="M12.0369 8.46265V15.6111"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			d="M15.6147 12.0369H8.45886"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.30005 12.0369C2.30005 4.73479 4.73479 2.30005 12.0369 2.30005C19.339 2.30005 21.7737 4.73479 21.7737 12.0369C21.7737 19.339 19.339 21.7737 12.0369 21.7737C4.73479 21.7737 2.30005 19.339 2.30005 12.0369Z"
			stroke={color ?? "#000000"}
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</Svg>
);
export default AddIcon;
