import styled from "styled-components";
import AnalogContext from "./AnalogContext";
import Modal from "./Modal";
const { decodeEntities } = wp.htmlEntities;
const { apiFetch } = wp;

const TemplatesList = styled.ul`
	margin: 0;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
	text-transform: uppercase;
	color: #000;

	p {
		color: #939393;
		letter-spacing: 1px;
		font-size: 10px;
		margin: 0;
		font-weight: 500;
	}

	h3 {
		font-size: 15px;
		margin: 10px 0 5px;
	}

	img {
		width: 100%;
		height: auto;
	}

	figure {
		margin: 0;
		position: relative;

		&:hover .actions {
			opacity: 1;
		}
	}

	.actions {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.7);
		top: 0;
		left: 0;
		z-index: 100;
	}

	button {
		display: block;
		border: none;
		outline: 0;
		font-size: 12px;
		text-transform: uppercase;
		padding: 10px;
		font-weight: bold;
		background: #ff7865;
		width: 100px;
		color: #fff;
		cursor: pointer;

		+ button {
			margin-top: 10px;
		}
	}
`;

const StyledButton = styled.button`
	text-transform: uppercase;
	padding: 5px 10px;
`;

class Templates extends React.Component {
	state = {
		template: null
	};

	setModalContent = template => {
		this.context.dispatch({
			isOpen: !this.context.state.isOpen
		});
		this.setState({
			template: template
		});
	};

	importLayout = template => {
		if (!template) {
			template = this.state.template;
		}

		const editor_id =
			"undefined" !== typeof ElementorConfig ? ElementorConfig.post_id : false;

		apiFetch({
			path: "/agwp/v1/import/elementor",
			method: "post",
			data: {
				template_id: template.id,
				editor_post_id: editor_id
			}
		}).then(data => {
			const template = JSON.parse(data);

			if (typeof elementor !== "undefined") {
				const model = new Backbone.Model({
					getTitle: function getTitle() {
						return "Test";
					}
				});

				elementor.channels.data.trigger("template:before:insert", model);
				for (let i = 0; i < template.content.length; i++) {
					elementor.getPreviewView().addChildElement(template.content[i]);
				}
				elementor.channels.data.trigger("template:after:insert", {});
				window.analogModal.hide();
			}
		});
	};

	render() {
		return (
			<div
				style={{
					position: "relative",
					minHeight: "80vh"
				}}
			>
				{this.context.state.isOpen && (
					<Modal
						template={this.state.template}
						onRequestClose={() => this.context.dispatch({ isOpen: false })}
						onRequestImport={() => this.importLayout()}
					/>
				)}
				<TemplatesList>
					<AnalogContext.Consumer>
						{context =>
							context.state.count >= 1 &&
							context.state.templates.map(template => (
								<li key={template.id}>
									<figure>
										{template.thumbnail && <img src={template.thumbnail} />}
										<div className="actions">
											<StyledButton
												onClick={() => this.setModalContent(template)}
											>
												Preview
											</StyledButton>
											<StyledButton onClick={() => this.importLayout(template)}>
												Import
											</StyledButton>
										</div>
									</figure>
									<h3>{decodeEntities(template.title)}</h3>
								</li>
							))
						}
					</AnalogContext.Consumer>
				</TemplatesList>
			</div>
		);
	}
}

Templates.contextType = AnalogContext;

export default Templates;
