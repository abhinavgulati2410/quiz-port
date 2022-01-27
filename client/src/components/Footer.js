import React from "react";
import GitHubButton from "react-github-btn";

const Footer = () => {
	return (
		<div className="Footer">
			<div className="text">
				Made By Abhinav Gulati
			</div>

			<span className="margin-left">
				<GitHubButton
					href="https://github.com/abhinavgulati2410"
					data-icon="octicon-star"
					data-size="large"
					aria-label="Star abhinavgulati2410 on GitHub">
					Star
				</GitHubButton>
			</span>

			<span className="margin-left" style={{ marginInline: "1rem" }}>
				or
			</span>

			<span className="margin-left">
				<GitHubButton
					href="https://github.com/abhinavgulati2410"
					data-icon="octicon-repo-forked"
					data-size="large"
					aria-label="Fork abhinavgulati2410 on GitHub">
					Fork
				</GitHubButton>
			</span>
		</div>
	);
};

export default Footer;
