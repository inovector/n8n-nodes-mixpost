import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

export class Mixpost implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Mixpost',
		name: 'mixpost',
		icon: 'file:mixpost.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Mixpost API',
		defaults: {
			name: 'Mixpost',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'mixpostApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Media',
						value: 'media',
					},
					{
						name: 'Media Folder',
						value: 'mediaFolder',
					},
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
				],
				default: 'post',
			},
			{
				displayName: 'Workspace UUID',
				name: 'workspaceUuid',
				type: 'string',
				default: '',
				required: true,
				description: 'The UUID of the workspace',
			},
			// Account Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get a specific account',
						action: 'Get an account',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many social accounts',
						action: 'Get many accounts',
					},
				],
				default: 'getAll',
			},
			// Media Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['media'],
					},
				},
				options: [
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a media file',
						action: 'Delete a media file',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a media file',
						action: 'Get a media file',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many media files',
						action: 'Get many media files',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a media file',
						action: 'Update a media file',
					},
					{
						name: 'Upload',
						value: 'upload',
						description: 'Upload a new media file',
						action: 'Upload a media file',
					},
				],
				default: 'getAll',
			},
			// Media Folder Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['mediaFolder'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a media folder',
						action: 'Create a media folder',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a media folder',
						action: 'Delete a media folder',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get the whole media folder tree',
						action: 'Get many media folders',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Rename a media folder or move it under another',
						action: 'Update a media folder',
					},
				],
				default: 'getAll',
			},
			// Post Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['post'],
					},
				},
				options: [
					{
						name: 'Add to Queue',
						value: 'queue',
						description: 'Add a post to queue',
						action: 'Add post to queue',
					},
					{
						name: 'Approve',
						value: 'approve',
						description: 'Approve a post',
						action: 'Approve a post',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new post',
						action: 'Create a post',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a post',
						action: 'Delete a post',
					},
					{
						name: 'Delete Bulk',
						value: 'deleteBulk',
						description: 'Delete multiple posts',
						action: 'Delete multiple posts',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a post',
						action: 'Get a post',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many posts',
						action: 'Get many posts',
					},
					{
						name: 'Schedule',
						value: 'schedule',
						description: 'Schedule a post',
						action: 'Schedule a post',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a post',
						action: 'Update a post',
					},
				],
				default: 'create',
			},
			// Tag Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tag'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new tag',
						action: 'Create a tag',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a tag',
						action: 'Delete a tag',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a tag',
						action: 'Get a tag',
					},
					{
						name: 'Get Many',
						value: 'getAll',
						description: 'Get many tags',
						action: 'Get many tags',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a tag',
						action: 'Update a tag',
					},
				],
				default: 'getAll',
			},
			// Account Get
			{
				displayName: 'Account UUID',
				name: 'accountUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['get'],
					},
				},
				description: 'The UUID of the account',
			},
			// Media Fields
			{
				displayName: 'Media UUID',
				name: 'mediaUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['get', 'update'],
					},
				},
				description: 'The UUID of the media file',
			},
			{
				displayName: 'Media IDs',
				name: 'mediaIds',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['delete'],
					},
				},
				description:
					'Comma-separated list of media IDs or UUIDs to delete, up to 500 per request. The two may be mixed.',
			},
			{
				displayName: 'File',
				name: 'file',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['upload'],
					},
				},
				description: 'Binary property containing the file to upload',
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Alt Text',
						name: 'alt_text',
						type: 'string',
						default: '',
						description: 'Alt text for the media file',
					},
					{
						displayName: 'Folder UUID',
						name: 'folder',
						type: 'string',
						default: '',
						description:
							'UUID of the folder to file the media into. Leave empty to move it back to the root. An unknown folder is rejected.',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the media file',
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['upload'],
					},
				},
				options: [
					{
						displayName: 'Alt Text',
						name: 'alt_text',
						type: 'string',
						default: '',
						description: 'Alt text for the media file',
					},
					{
						displayName: 'Folder UUID',
						name: 'folder',
						type: 'string',
						default: '',
						description:
							'UUID of the folder to file the upload into. Leave empty to file it at the root.',
					},
				],
			},
			// Media Folder Fields
			{
				displayName: 'Folder UUID',
				name: 'folderUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['mediaFolder'],
						operation: ['update', 'delete'],
					},
				},
				description: 'The UUID of the media folder',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['mediaFolder'],
						operation: ['create'],
					},
				},
				description: 'The name of the folder. Must be unique among its siblings.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['mediaFolder'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Parent UUID',
						name: 'parent',
						type: 'string',
						default: '',
						description:
							'UUID of the folder to create this one in. Leave empty to create a root folder. Folders nest at most five levels deep.',
					},
				],
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['mediaFolder'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Move to Root',
						name: 'moveToRoot',
						type: 'boolean',
						default: false,
						description: 'Whether to move the folder to the root, ignoring Parent UUID',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The new name of the folder',
					},
					{
						displayName: 'Parent UUID',
						name: 'parent',
						type: 'string',
						default: '',
						description:
							'UUID of the folder to move this one under. A folder cannot be moved into itself or into anything below it.',
					},
				],
			},
			{
				displayName: 'Delete Media',
				name: 'deleteMedia',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['mediaFolder'],
						operation: ['delete'],
					},
				},
				description:
					'Whether to delete the files filed at or below the folder too. When off, they move up to the deleted folder&apos;s parent.',
			},
			// Tag Fields
			{
				displayName: 'Tag UUID',
				name: 'tagUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['get', 'delete', 'update'],
					},
				},
				description: 'The UUID of the tag',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				description: 'The name of the tag',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'Color',
						name: 'hex_color',
						type: 'color',
						default: '',
						description: 'The color of the tag (hex format)',
					},
				],
			},
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['tag'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The name of the tag',
					},
					{
						displayName: 'Color',
						name: 'hex_color',
						type: 'color',
						default: '',
						description: 'The color of the tag (hex format)',
					},
				],
			},
			// Post Create
			{
				displayName: 'Type',
				name: 'postType',
				type: 'options',
				options: [
					{
						name: 'Draft',
						value: 'draft',
						description: 'Save as draft without scheduling',
					},
					{
						name: 'Schedule',
						value: 'schedule',
						description: 'Schedule the post for a specific date and time',
					},
					{
						name: 'Schedule Now',
						value: 'schedule_now',
						description: 'Publish the post immediately',
					},
					{
						name: 'Add to Queue',
						value: 'queue',
						description: 'Add the post to the publishing queue',
					},
				],
				default: 'draft',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create'],
					},
				},
				description: 'How to handle the post',
			},
			{
				displayName: 'Date & Time',
				name: 'date',
				type: 'dateTime',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create'],
						postType: ['schedule'],
					},
				},
				description: 'The date and time to schedule the post',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: '',
				placeholder: 'America/New_York',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create'],
						postType: ['schedule'],
					},
				},
				description: 'Timezone for the scheduled post (defaults to user profile timezone)',
			},
			{
				displayName: 'Account IDs',
				name: 'accountIds',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create'],
					},
				},
				description: 'Comma-separated list of account IDs to post to',
			},
			{
				displayName: 'Tag IDs',
				name: 'tagIds',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create'],
					},
				},
				description: 'Comma-separated list of tag IDs',
			},
			{
				displayName: 'Versions',
				name: 'versions',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create'],
					},
				},
				description: 'Content versions for different accounts',
				placeholder: 'Add Version',
				options: [
					{
						name: 'version',
						displayName: 'Version',
						values: [
							{
								displayName: 'Account ID',
								name: 'account_id',
								type: 'number',
								default: 0,
								description: 'The account ID for this version (0 for first version)',
							},
							{
								displayName: 'Is Original',
								name: 'is_original',
								type: 'boolean',
								default: true,
								description: 'Whether this is the original version (true for first version)',
							},
							{
								displayName: 'Content',
								name: 'content',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								placeholder: 'Add Content Item',
								default: {},
								description: 'Content items for this version',
								options: [
									{
										name: 'contentItem',
										displayName: 'Content Item',
										values: [
											{
												displayName: 'Body',
												name: 'body',
												type: 'string',
												typeOptions: {
													rows: 5,
												},
												default: '',
												description: 'The text content of the post',
											},
											{
												displayName: 'Media IDs',
												name: 'media',
												type: 'string',
												default: '',
												description: 'Comma-separated list of media IDs',
											},
											{
												displayName: 'URL',
												name: 'url',
												type: 'string',
												default: '',
												description: 'URL to include in the post',
											},
										],
									},
								],
							},
							{
								displayName: 'Options',
								name: 'options',
								type: 'fixedCollection',
								typeOptions: {
									multipleValues: true,
								},
								placeholder: 'Add Option',
								default: {},
								description: 'Provider-specific options',
								options: [
									{
										name: 'option',
										displayName: 'Option',
										values: [
											{
												displayName: 'Provider',
												name: 'provider',
												type: 'string',
												default: '',
												placeholder: 'mastodon',
												description: 'Provider name (e.g., mastodon, twitter)',
											},
											{
												displayName: 'Key',
												name: 'key',
												type: 'string',
												default: '',
												placeholder: 'sensitive',
												description: 'Option key',
											},
											{
												displayName: 'Value',
												name: 'value',
												type: 'string',
												default: '',
												description: 'Option value (string, number, or boolean)',
											},
										],
									},
								],
							},
						],
					},
				],
			},
			// Post Schedule
			{
				displayName: 'Post UUID',
				name: 'postUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['schedule'],
					},
				},
				description: 'The UUID of the post to schedule',
			},
			{
				displayName: 'Post Now',
				name: 'postNow',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['schedule'],
					},
				},
				description: 'Whether to post immediately instead of at the scheduled date and time',
			},
			// Post Queue
			{
				displayName: 'Post UUID',
				name: 'postUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['queue'],
					},
				},
				description: 'The UUID of the post to add to queue',
			},
			// Post Approve
			{
				displayName: 'Post UUID',
				name: 'postUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['approve'],
					},
				},
				description: 'The UUID of the post to approve',
			},
			// Post Get/Delete/Update
			{
				displayName: 'Post UUID',
				name: 'postUuid',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['get', 'delete', 'update'],
					},
				},
				description: 'The UUID of the post',
			},
			// Post Delete Options
			{
				displayName: 'Trash',
				name: 'trash',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['delete'],
					},
				},
				description: 'Whether to move the post to trash instead of permanently deleting',
			},
			{
				displayName: 'Delete Mode',
				name: 'delete_mode',
				type: 'options',
				options: [
					{
						name: 'App Only',
						value: 'app_only',
						description: 'Delete only from the app (default)',
					},
					{
						name: 'App and Social',
						value: 'app_and_social',
						description: 'Delete from both app and social media platforms',
					},
					{
						name: 'Social Only',
						value: 'social_only',
						description: 'Delete only from social media platforms',
					},
				],
				default: 'app_only',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['delete'],
					},
				},
				description: 'Where to delete the post from',
			},
			// Post Delete Bulk
			{
				displayName: 'Post UUIds',
				name: 'postUuids',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['deleteBulk'],
					},
				},
				description: 'Comma-separated list of post UUIds to delete',
			},
			{
				displayName: 'Trash',
				name: 'trash',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['deleteBulk'],
					},
				},
				description: 'Whether to move the posts to trash instead of permanently deleting',
			},
			{
				displayName: 'Delete Mode',
				name: 'delete_mode',
				type: 'options',
				options: [
					{
						name: 'App Only',
						value: 'app_only',
						description: 'Delete only from the app (default)',
					},
					{
						name: 'App and Social',
						value: 'app_and_social',
						description: 'Delete from both app and social media platforms',
					},
					{
						name: 'Social Only',
						value: 'social_only',
						description: 'Delete only from social media platforms',
					},
				],
				default: 'app_only',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['deleteBulk'],
					},
				},
				description: 'Where to delete the posts from',
			},
			// Post Update
			{
				displayName: 'Update Fields',
				name: 'updateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['update'],
					},
				},
				options: [
					{
						displayName: 'Account IDs',
						name: 'accountIds',
						type: 'string',
						default: '',
						description: 'Comma-separated list of account IDs',
					},
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						typeOptions: {
							rows: 5,
						},
						default: '',
						description: 'The content of the post',
					},
					{
						displayName: 'Media URLs',
						name: 'media',
						type: 'string',
						default: '',
						description: 'Comma-separated list of media URLs to attach',
					},
					{
						displayName: 'Schedule Date',
						name: 'scheduleAt',
						type: 'dateTime',
						default: '',
						description: 'Date and time to schedule the post',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Comma-separated list of tags',
					},
				],
			},
			// Post Get All
			{
				displayName: 'Per Page Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['getAll'],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Account IDs',
						name: 'accounts',
						type: 'string',
						default: '',
						description: 'Filter posts by account IDs (comma-separated list)',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filter posts by keyword in content',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'Page number for pagination',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Draft',
								value: 'draft',
							},
							{
								name: 'Failed',
								value: 'failed',
							},
							{
								name: 'Needs Approval',
								value: 'needs_approval',
							},
							{
								name: 'Only From Trash',
								value: 'trash',
							},
							{
								name: 'Published',
								value: 'published',
							},
							{
								name: 'Scheduled',
								value: 'scheduled',
							},
						],
						default: 'draft',
						description: 'Filter posts by status',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Filter posts by tags (comma-separated list)',
					},
				],
			},
			// Media Get All
			{
				displayName: 'Per Page Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['getAll'],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['media'],
						operation: ['getAll'],
					},
				},
				options: [
					{
						displayName: 'Favorite',
						name: 'favorite',
						type: 'boolean',
						default: false,
						description:
							'Whether to return only the files the token&apos;s user has starred. Ignored while Keyword is set.',
					},
					{
						displayName: 'Folder',
						name: 'folder',
						type: 'string',
						default: '',
						description:
							'A folder UUID, or "root" for the files filed in no folder. Leave empty to list the whole library. Ignored while Keyword is set.',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description:
							'Return files whose name contains this text. A search reaches the whole library, so it overrides Folder and Favorite.',
					},
					{
						displayName: 'MIME Types',
						name: 'mime_types',
						type: 'string',
						default: '',
						description: 'Return only these exact MIME types (comma-separated list)',
					},
					{
						displayName: 'Sort',
						name: 'sort',
						type: 'options',
						options: [
							{
								name: 'Name',
								value: 'name',
							},
							{
								name: 'Newest',
								value: 'newest',
							},
							{
								name: 'Oldest',
								value: 'oldest',
							},
							{
								name: 'Size',
								value: 'size',
							},
						],
						default: 'newest',
						description: 'Order of the listing',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'GIF',
								value: 'gif',
							},
							{
								name: 'Image',
								value: 'image',
							},
							{
								name: 'Video',
								value: 'video',
							},
						],
						default: 'image',
						description: 'Return only files of this kind',
					},
					{
						displayName: 'Usage',
						name: 'usage',
						type: 'options',
						options: [
							{
								name: 'Draft',
								value: 'draft',
							},
							{
								name: 'Published',
								value: 'published',
							},
							{
								name: 'Scheduled',
								value: 'scheduled',
							},
							{
								name: 'Unused',
								value: 'unused',
							},
						],
						default: 'unused',
						description:
							'Return only files used this way. A file sits in the strongest bucket it qualifies for.',
					},
				],
			},
			// Media/Tag Get All
			// {
			// 	displayName: 'Return All',
			// 	name: 'returnAll',
			// 	type: 'boolean',
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['media', 'tag'],
			// 			operation: ['getAll'],
			// 		},
			// 	},
			// 	default: false,
			// 	description: 'Whether to return all results or only up to a given limit',
			// },
			// {
			// 	displayName: 'Limit',
			// 	name: 'limit',
			// 	type: 'number',
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['media', 'tag'],
			// 			operation: ['getAll'],
			// 			returnAll: [false],
			// 		},
			// 	},
			// 	typeOptions: {
			// 		minValue: 1,
			// 	},
			// 	default: 50,
			// 	description: 'Max number of results to return',
			// },
			// Account Get All
			// {
			// 	displayName: 'Return All',
			// 	name: 'returnAll',
			// 	type: 'boolean',
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['account'],
			// 			operation: ['getAll'],
			// 		},
			// 	},
			// 	default: false,
			// 	description: 'Whether to return all results or only up to a given limit',
			// },
			// {
			// 	displayName: 'Limit',
			// 	name: 'limit',
			// 	type: 'number',
			// 	displayOptions: {
			// 		show: {
			// 			resource: ['account'],
			// 			operation: ['getAll'],
			// 			returnAll: [false],
			// 		},
			// 	},
			// 	typeOptions: {
			// 		minValue: 1,
			// 	},
			// 	default: 50,
			// 	description: 'Max number of results to return',
			// },
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const credentials = await this.getCredentials('mixpostApi');

		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		const baseUrl = (credentials.url as string).replace(/\/$/, '');
		const accessToken = credentials.accessToken as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData;
				let requestMethod: string = 'GET';
				let endpoint: string = '';
				let body: any = {};
				let qs: IDataObject = {};

				const workspaceUuid = this.getNodeParameter('workspaceUuid', i) as string;

				if (resource === 'account') {
					if (operation === 'get') {
						requestMethod = 'GET';
						const accountUuid = this.getNodeParameter('accountUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/accounts/${accountUuid}`;
					} else if (operation === 'getAll') {
						requestMethod = 'GET';
						endpoint = `/api/${workspaceUuid}/accounts`;
					}
				} else if (resource === 'media') {
					if (operation === 'getAll') {
						requestMethod = 'GET';
						endpoint = `/api/${workspaceUuid}/media`;

						qs.limit = this.getNodeParameter('limit', i) as number;

						const filters = this.getNodeParameter('filters', i) as IDataObject;

						for (const key of ['folder', 'type', 'keyword', 'usage', 'sort'] as const) {
							if (filters[key]) {
								qs[key] = filters[key];
							}
						}
						if (filters.favorite) {
							qs.favorite = 1;
						}
						if (filters.mime_types) {
							const mimeTypes = (filters.mime_types as string)
								.split(',')
								.map((mimeType) => mimeType.trim())
								.filter((mimeType) => mimeType);
							if (mimeTypes.length > 0) {
								qs.mime_types = mimeTypes;
							}
						}
					} else if (operation === 'get') {
						requestMethod = 'GET';
						const mediaUuid = this.getNodeParameter('mediaUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/media/${mediaUuid}`;
					} else if (operation === 'upload') {
						requestMethod = 'POST';
						endpoint = `/api/${workspaceUuid}/media`;

						const dataBinary = this.getNodeParameter('file', i, 'data') as any;

						if (
							!dataBinary?.data ||
							!dataBinary.data.data ||
							!dataBinary.data.mimeType ||
							!dataBinary.data.fileName
						) {
							throw new NodeOperationError(
								this.getNode(),
								`Unsupported file: not binary or missing one or more required attributes (data, mimeType, fileName)`,
								{ itemIndex: i },
							);
						}

						const blob = new Blob([Buffer.from(dataBinary.data.data, 'base64')], {
							type: dataBinary.data.mimeType,
						});

						const formData = new FormData();
						formData.append('file', blob, dataBinary.data.fileName);

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.alt_text) {
							formData.append('alt_text', additionalFields.alt_text as string);
						}
						if (additionalFields.folder) {
							formData.append('folder', additionalFields.folder as string);
						}

						// Set form data instead of JSON body
						body = formData;
					} else if (operation === 'update') {
						requestMethod = 'PUT';
						const mediaUuid = this.getNodeParameter('mediaUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/media/${mediaUuid}`;

						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						if (updateFields.alt_text) {
							body.alt_text = updateFields.alt_text;
						}
						if (updateFields.name) {
							body.name = updateFields.name;
						}
						// Naming the key is what asks for the move, so an empty folder files at the root.
						if (updateFields.folder !== undefined) {
							body.folder = updateFields.folder || null;
						}
					} else if (operation === 'delete') {
						requestMethod = 'DELETE';
						endpoint = `/api/${workspaceUuid}/media`;

						const mediaIds = (this.getNodeParameter('mediaIds', i) as string)
							.split(',')
							.map((id) => id.trim())
							.filter((id) => id);
						body.items = mediaIds;
					}
				} else if (resource === 'mediaFolder') {
					if (operation === 'getAll') {
						requestMethod = 'GET';
						endpoint = `/api/${workspaceUuid}/media/folders`;
					} else if (operation === 'create') {
						requestMethod = 'POST';
						endpoint = `/api/${workspaceUuid}/media/folders`;

						body.name = this.getNodeParameter('name', i) as string;

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.parent) {
							body.parent = additionalFields.parent;
						}
					} else if (operation === 'update') {
						requestMethod = 'PUT';
						const folderUuid = this.getNodeParameter('folderUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/media/folders/${folderUuid}`;

						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						if (updateFields.name) {
							body.name = updateFields.name;
						}
						// Sending the key is what asks for the move, and only an explicit request
						// moves a folder to the root — an empty Parent UUID means "leave it where it is".
						if (updateFields.moveToRoot) {
							body.parent = null;
						} else if (updateFields.parent) {
							body.parent = updateFields.parent;
						}
					} else if (operation === 'delete') {
						requestMethod = 'DELETE';
						const folderUuid = this.getNodeParameter('folderUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/media/folders/${folderUuid}`;

						body.delete_media = this.getNodeParameter('deleteMedia', i) as boolean;
					}
				} else if (resource === 'tag') {
					if (operation === 'getAll') {
						requestMethod = 'GET';
						endpoint = `/api/${workspaceUuid}/tags`;
					} else if (operation === 'get') {
						requestMethod = 'GET';
						const tagUuid = this.getNodeParameter('tagUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/tags/${tagUuid}`;
					} else if (operation === 'create') {
						requestMethod = 'POST';
						endpoint = `/api/${workspaceUuid}/tags`;

						body.name = this.getNodeParameter('name', i) as string;

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.hex_color) {
							body.hex_color = additionalFields.hex_color;
						}
					} else if (operation === 'update') {
						requestMethod = 'PUT';
						const tagUuid = this.getNodeParameter('tagUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/tags/${tagUuid}`;

						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						if (updateFields.name) {
							body.name = updateFields.name;
						}
						if (updateFields.hex_color) {
							body.hex_color = updateFields.hex_color;
						}
					} else if (operation === 'delete') {
						requestMethod = 'DELETE';
						const tagUuid = this.getNodeParameter('tagUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/tags/${tagUuid}`;
					}
				} else if (resource === 'post') {
					if (operation === 'create') {
						requestMethod = 'POST';
						endpoint = `/api/${workspaceUuid}/posts`;

						// Get post type
						const postType = this.getNodeParameter('postType', i) as string;

						// Handle date and time based on post type
						let dateStr = '';
						let timeStr = '';

						if (postType === 'schedule') {
							// Parse date and time from the datetime input
							const dateTimeInput = this.getNodeParameter('date', i) as string;
							const dateObj = new Date(dateTimeInput);

							// Format date as Y-m-d and time as H:i
							const year = dateObj.getFullYear();
							const month = String(dateObj.getMonth() + 1).padStart(2, '0');
							const day = String(dateObj.getDate()).padStart(2, '0');
							const hours = String(dateObj.getHours()).padStart(2, '0');
							const minutes = String(dateObj.getMinutes()).padStart(2, '0');

							dateStr = `${year}-${month}-${day}`;
							timeStr = `${hours}:${minutes}`;
							body.schedule = true;

							if (dateStr && timeStr) {
								body.date = dateStr;
								body.time = timeStr;
							}

							const timezone = this.getNodeParameter('timezone', i, '') as string;
							if (timezone) {
								body.timezone = timezone;
							}
						} else {
							// For non-scheduled posts, use current date/time
							// const now = new Date();
							// const year = now.getFullYear();
							// const month = String(now.getMonth() + 1).padStart(2, '0');
							// const day = String(now.getDate()).padStart(2, '0');
							// const hours = String(now.getHours()).padStart(2, '0');
							// const minutes = String(now.getMinutes()).padStart(2, '0');

							// dateStr = `${year}-${month}-${day}`;
							// timeStr = `${hours}:${minutes}`;

							// Set appropriate flags based on type
							if (postType === 'schedule_now') {
								body.schedule_now = true;
							} else if (postType === 'queue') {
								body.queue = true;
							}
							// 'draft' doesn't need any special flag
						}

						if (dateStr && timeStr) {
							body.date = dateStr;
							body.time = timeStr;
						}

						// Get versions from fixed collection
						const versionsData = this.getNodeParameter('versions', i) as IDataObject;
						const versionItems = (versionsData.version as IDataObject[]) || [];

						// Build versions array
						body.versions = versionItems.map((versionItem, index) => {
							const version: any = {
								// Apply defaults for first version only
								account_id:
									versionItem.account_id !== undefined
										? versionItem.account_id
										: index === 0
										? 0
										: null,
								is_original:
									versionItem.is_original !== undefined
										? versionItem.is_original
										: index === 0
										? true
										: false,
								content: [],
							};

							// Handle content as fixedCollection
							const contentData = (versionItem.content as IDataObject) || {};
							const contentItems = (contentData.contentItem as IDataObject[]) || [];

							// Process each content item
							version.content = contentItems.map((item) => {
								const contentItem: any = {};

								if (item.body !== undefined && item.body !== '') {
									contentItem.body = item.body;
								}

								if (item.url !== undefined && item.url !== '') {
									contentItem.url = item.url;
								}

								// Handle media IDs - convert comma-separated string to array of numbers
								if (item.media !== undefined && item.media !== '') {
									contentItem.media = (item.media as string)
										.split(',')
										.map((id) => parseInt(id.trim()))
										.filter((id) => !isNaN(id));
								} else {
									contentItem.media = [];
								}

								return contentItem;
							});

							// If no content items provided, add an empty content array
							if (version.content.length === 0) {
								version.content = [{ body: '', media: [] }];
							}

							// Handle provider options
							const optionsData = (versionItem.options as IDataObject) || {};
							const optionItems = (optionsData.option as IDataObject[]) || [];

							if (optionItems.length > 0) {
								version.options = {};

								// Group options by provider and key
								optionItems.forEach((optionItem) => {
									const provider = optionItem.provider as string;
									const key = optionItem.key as string;
									let value = optionItem.value as string;

									if (provider && key) {
										if (!version.options[provider]) {
											version.options[provider] = {};
										}

										// Try to parse value as boolean or number
										if (value === 'true') {
											version.options[provider][key] = true;
										} else if (value === 'false') {
											version.options[provider][key] = false;
										} else if (!isNaN(Number(value))) {
											version.options[provider][key] = Number(value);
										} else {
											version.options[provider][key] = value;
										}
									}
								});
							}

							return version;
						});

						// Handle accounts array from main field
						const accountIds = this.getNodeParameter('accountIds', i) as string;
						if (accountIds) {
							body.accounts = accountIds
								.split(',')
								.map((id) => parseInt(id.trim()))
								.filter((id) => !isNaN(id));
						}

						// Handle tags array from main field
						const tagIds = this.getNodeParameter('tagIds', i, '') as string;
						if (tagIds) {
							body.tags = tagIds
								.split(',')
								.map((id) => parseInt(id.trim()))
								.filter((id) => !isNaN(id));
						}
					} else if (operation === 'get') {
						requestMethod = 'GET';
						const postUuid = this.getNodeParameter('postUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/posts/${postUuid}`;
					} else if (operation === 'getAll') {
						requestMethod = 'GET';
						endpoint = `/api/${workspaceUuid}/posts`;

						qs.limit = this.getNodeParameter('limit', i) as number;

						const filters = this.getNodeParameter('filters', i) as IDataObject;

						if (filters.status) {
							qs.status = filters.status;
						}
						if (filters.keyword) {
							qs.keyword = filters.keyword;
						}
						if (filters.accounts) {
							// Convert comma-separated string to array
							const accountIds = (filters.accounts as string)
								.split(',')
								.map((id) => id.trim())
								.filter((id) => id);
							if (accountIds.length > 0) {
								qs.accounts = accountIds;
							}
						}
						if (filters.tags) {
							// Convert comma-separated string to array
							const tagNames = (filters.tags as string)
								.split(',')
								.map((tag) => tag.trim())
								.filter((tag) => tag);
							if (tagNames.length > 0) {
								qs.tags = tagNames;
							}
						}
						if (filters.page) {
							qs.page = filters.page;
						}
					} else if (operation === 'update') {
						requestMethod = 'PUT';
						const postUuid = this.getNodeParameter('postUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/posts/${postUuid}`;

						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						if (updateFields.content) {
							body.content = updateFields.content;
						}
						if (updateFields.scheduleAt) {
							body.schedule_at = updateFields.scheduleAt;
						}
						if (updateFields.media) {
							body.media = (updateFields.media as string).split(',').map((url) => url.trim());
						}
						if (updateFields.tags) {
							body.tags = (updateFields.tags as string).split(',').map((tag) => tag.trim());
						}
						if (updateFields.accountIds) {
							body.account_ids = (updateFields.accountIds as string)
								.split(',')
								.map((id) => id.trim());
						}
					} else if (operation === 'delete') {
						requestMethod = 'DELETE';
						const postUuid = this.getNodeParameter('postUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/posts/${postUuid}`;

						// Handle delete options
						const trash = this.getNodeParameter('trash', i, false) as boolean;
						if (trash) {
							body.trash = true;
						}

						const deleteMode = this.getNodeParameter('delete_mode', i, 'app_only') as string;
						body.delete_mode = deleteMode;
					} else if (operation === 'deleteBulk') {
						requestMethod = 'DELETE';
						endpoint = `/api/${workspaceUuid}/posts`;

						const postUuids = (this.getNodeParameter('postUuids', i) as string)
							.split(',')
							.map((id) => id.trim());
						body.posts = postUuids;

						// Handle delete options
						const trash = this.getNodeParameter('trash', i, false) as boolean;
						if (trash) {
							body.trash = true;
						}

						const deleteMode = this.getNodeParameter('delete_mode', i, 'app_only') as string;
						body.delete_mode = deleteMode;
					} else if (operation === 'schedule') {
						requestMethod = 'POST';
						const postUuid = this.getNodeParameter('postUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/posts/schedule/${postUuid}`;

						// Handle post now option
						const postNow = this.getNodeParameter('postNow', i, false) as boolean;
						if (postNow) {
							body.postNow = true;
						}
					} else if (operation === 'queue') {
						requestMethod = 'POST';
						const postUuid = this.getNodeParameter('postUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/posts/add-to-queue/${postUuid}`;
					} else if (operation === 'approve') {
						requestMethod = 'POST';
						const postUuid = this.getNodeParameter('postUuid', i) as string;
						endpoint = `/api/${workspaceUuid}/posts/approve/${postUuid}`;
					}
				}

				const requestOptions: any = {
					method: requestMethod,
					url: `${baseUrl}${endpoint}`,
					headers: {
						Accept: 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				};

				// Add query parameters if present
				if (Object.keys(qs).length > 0) {
					requestOptions.qs = qs;
				}

				// Handle different body types
				if (resource === 'media' && operation === 'upload') {
					// For FormData uploads, body is FormData object - httpRequest handles this automatically
					requestOptions.body = body;
				} else if (Object.keys(body).length > 0) {
					// For JSON requests
					requestOptions.headers['Content-Type'] = 'application/json';
					requestOptions.body = body;
				}

				responseData = await this.helpers.httpRequest(requestOptions);

				if (Array.isArray(responseData)) {
					returnData.push(...responseData);
				} else if (responseData && responseData.data && Array.isArray(responseData.data)) {
					returnData.push(...responseData.data);
				} else {
					returnData.push(responseData);
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					let errorMessage = 'An unknown error occurred';
					let errorDetails = {};

					if (error instanceof Error) {
						errorMessage = error.message;
					}

					// Handle HTTP errors with detailed validation responses
					if (error.response) {
						const statusCode = error.response.status;
						errorMessage = `HTTP ${statusCode}: ${error.response.statusText || 'Request failed'}`;

						// Laravel validation errors (422) usually contain detailed field errors
						if (error.response.data) {
							if (statusCode === 422 && error.response.data.errors) {
								// Laravel validation errors format
								errorDetails = {
									validationErrors: error.response.data.errors,
									message: error.response.data.message || 'Validation failed',
								};
								errorMessage = `Validation Error: ${
									error.response.data.message || 'The given data was invalid'
								}`;
							} else if (error.response.data.message) {
								// Other Laravel errors with message
								errorMessage = `${errorMessage} - ${error.response.data.message}`;
								errorDetails = error.response.data;
							} else if (typeof error.response.data === 'string') {
								errorMessage = `${errorMessage} - ${error.response.data}`;
							} else {
								errorDetails = error.response.data;
							}
						}
					}

					returnData.push({
						error: errorMessage,
						...(Object.keys(errorDetails).length > 0 && { errorDetails }),
					});
					continue;
				}

				// Enhanced error for non-continue-on-fail mode
				if (error.response && error.response.status === 422 && error.response.data?.errors) {
					const validationErrors = error.response.data.errors;
					const fieldErrors = Object.entries(validationErrors)
						.map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
						.join('; ');

					throw new NodeOperationError(
						this.getNode(),
						`Validation Error: ${
							error.response.data.message || 'The given data was invalid.'
						} - ${fieldErrors}`,
						{ itemIndex: i },
					);
				}

				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
