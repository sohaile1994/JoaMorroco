import React, { Component } from "react";

const MenuTypes = {
	INFORMATION: "Information",
	TOURPLAN: "Tour Plan",
	GALLERY: "Gallery",
	REVIEWS: "Reviews",
};
class MenuContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeContent: MenuTypes.INFORMATION,
		};
	}

	handleMenuClick = (newActiveContent) => {
		this.setState({ activeContent: newActiveContent });
		if (this.props.onMenuClick) {
			this.props.onMenuClick(newActiveContent);
		}
	};

	render() {
		const { activeContent } = this.state;

		return (
			<ul className="menu-destination-page">
				<li
					onClick={() => this.handleMenuClick(MenuTypes.INFORMATION)}
					className={activeContent === MenuTypes.INFORMATION ? "active" : ""}
				>
					<span>Information</span>
				</li>
				<li
					onClick={() => this.handleMenuClick(MenuTypes.TOURPLAN)}
					className={activeContent === MenuTypes.TOURPLAN ? "active" : ""}
				>
					<span>Tour Plan</span>
				</li>
				<li
					onClick={() => this.handleMenuClick(MenuTypes.GALLERY)}
					className={activeContent === MenuTypes.GALLERY ? "active" : ""}
				>
					<span>Gallery</span>
				</li>
				<li
					onClick={() => this.handleMenuClick(MenuTypes.REVIEWS)}
					className={activeContent === MenuTypes.REVIEWS ? "active" : ""}
				>
					<span>Reviews</span>
				</li>
			</ul>
		);
	}
}

export default MenuContent;
export { MenuTypes };
