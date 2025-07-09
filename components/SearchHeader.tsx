import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { rMS } from "@/utils/responsive_size";
import { SIZES } from "@/constants/SIZES";
import { COLORS } from "@/constants/COLORS";
import { MaterialIcons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

const SearchHeader = ({
	screenTitle,
	setSearch,
	search,
}: {
	screenTitle: string;
	setSearch: (text: string) => void;
	search: string;
}) => {
	const [showSearchBar, setShowSearchBar] = useState(false);

	const handleOpenSearch = () => {
		setShowSearchBar((prev) => !prev);
	};
	const handleCloseSearch = () => {
		setShowSearchBar((prev) => !prev);
	};
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				height: rMS(60),
			}}
		>
			{showSearchBar ? (
				<SearchBar
					placeholder="search..."
					onChangeText={setSearch}
					value={search}
					style={{
						paddingVertical: rMS(SIZES.h8),
						width: "90%",
					}}
					onBlur={() => setShowSearchBar(false)}
				/>
			) : (
				<Text
					style={{
						fontSize: rMS(SIZES.h5),
						color: COLORS.darkBlue,
					}}
				>
					{screenTitle}
				</Text>
			)}
			<Pressable onPress={showSearchBar ? handleOpenSearch : handleCloseSearch}>
				{showSearchBar ? (
					<MaterialIcons
						name="close"
						size={rMS(SIZES.h4)}
						color={COLORS.darkBlue}
					/>
				) : (
					<MaterialIcons
						name="search"
						size={rMS(SIZES.h4)}
						color={COLORS.darkBlue}
					/>
				)}
			</Pressable>
		</View>
	);
};

export default SearchHeader;
