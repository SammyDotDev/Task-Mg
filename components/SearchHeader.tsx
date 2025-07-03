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
	showSearchBar,
	setShowSearchBar,
}: {
	screenTitle: string;
	setSearch: (text: string) => void;
	search: string;
	showSearchBar?: boolean;
	setShowSearchBar: (value: boolean) => void;
}) => {
	// const [showSearchBar, setShowSearchBar] = useState(true);

	const handleOpenSearch = () => {
		setShowSearchBar(true);
	};
	const handleCloseSearch = () => {
		setShowSearchBar(false);
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
					placeholder="Type Here..."
					onChangeText={setSearch}
					value={search}
					style={{
						paddingVertical: rMS(SIZES.h8),
						width: "90%",
					}}
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
			<Pressable onPress={showSearchBar ? handleCloseSearch : handleOpenSearch}>
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
