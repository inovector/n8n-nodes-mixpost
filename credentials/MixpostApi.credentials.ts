import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MixpostApi implements ICredentialType {
	name = 'mixpostApi';
	displayName = 'GravitySocial API';
	documentationUrl = 'https://docs.mixpost.app/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'GravitySocial URL',
			name: 'url',
			type: 'string',
			default: '',
			placeholder: 'https://social.gravitywrite.com/',
			required: true,
			description:
				'The base URL of your GravitySocial instance and core path. Example: <code>https://social.gravitywrite.com</code>',
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.url}}',
			url: '/api/ping',
			headers: {
				Accept: 'application/json',
			},
		},
	};
}
