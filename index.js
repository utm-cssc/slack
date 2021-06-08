const { PILLARS, TEAMS } = require('./constants');
const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
	token: process.env.TOKEN,
	signingSecret: process.env.SIGNING_SECRET,
	socketMode: true,
	appToken: process.env.APP_TOKEN
});

app.command('/idea', async ({ ack, body, client }) => {
	await ack();
	try {
		// Call views.open with the built-in client
		const result = await client.views.open({
			// Pass a valid trigger_id within 3 seconds of receiving it
			trigger_id: body.trigger_id,
			// View payload
			view: {
				type: 'modal',
				// View identifier
				callback_id: 'view_1',
				title: {
					type: 'plain_text',
					text: 'Submit an idea'
				},
				blocks: [
					{
						type: 'input',
						block_id: 'input_a',
						label: {
							type: 'plain_text',
							text: 'What is your idea?'
						},
						element: {
							type: 'plain_text_input',
							action_id: 'dreamy_input',
							multiline: true
						}
					},
					{
						type: 'section',
						block_id: 'input_b',
						text: {
							type: 'mrkdwn',
							text: 'What pillar(s) does it fall under?'
						},
						accessory: {
							action_id: 'text1',
							type: 'multi_static_select',
							placeholder: {
								type: 'plain_text',
								text: 'Select a pillar'
							},
							options: PILLARS
						}
					},
					{
						type: 'input',
						block_id: 'input_c',
						label: {
							type: 'plain_text',
							text: 'What goal does it fall under?'
						},
						element: {
							type: 'plain_text_input',
							action_id: 'dreamy_input',
							multiline: false
						}
					},
					{
						type: 'input',
						block_id: 'input_d',
						label: {
							type: 'plain_text',
							text: 'How does it compliment the pillar(s) and achieve the goal?'
						},
						element: {
							type: 'plain_text_input',
							action_id: 'dreamy_input',
							multiline: true
						}
					},
					{
						type: 'section',
						block_id: 'input_e',
						text: {
							type: 'mrkdwn',
							text: 'What team(s) would best execute this idea?'
						},
						accessory: {
							action_id: 'text2',
							type: 'multi_static_select',
							placeholder: {
								type: 'plain_text',
								text: 'Select a team'
							},
							options: TEAMS
						}
					}
				],
				submit: {
					type: 'plain_text',
					text: 'Submit'
				}
			}
		});
	} catch (error) {
		console.error(error);
	}
});

app.view('view_1', async ({ ack, body, view, client }) => {
	await ack();
	const values = view.state.values;
	const user = body['user']['id'];

	try {
		await client.chat.postMessage({
			channel: 'ideas',
			text: 'Idea submitted!',
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: 'Idea :zap:'
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: values.input_a.dreamy_input.value
					}
				},
				{
					type: 'divider'
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: 'Pillar(s) :books:'
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: values.input_b.text1.selected_options.map((option) => option.value).join(', ')
					}
				},
				{
					type: 'divider'
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: 'Goal :white_check_mark:'
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: values.input_c.dreamy_input.value
					}
				},
				{
					type: 'divider'
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: 'How does it compliment the pillar(s) and achieve the goal? :memo:'
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: values.input_d.dreamy_input.value
					}
				},
				{
					type: 'divider'
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: 'Team(s) :rocket:'
					}
				},
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: values.input_e.text2.selected_options.map((option) => option.value).join(', ')
					}
				},
				{
					type: 'divider'
				}
			]
		});

		await client.chat.postMessage({
			channel: user,
			text: 'Idea submitted!'
		});
	} catch (error) {
		console.error(error);
	}
});

(async () => {
	const port = 3000;
	// Start your app
	await app.start(process.env.PORT || port);
	console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();
