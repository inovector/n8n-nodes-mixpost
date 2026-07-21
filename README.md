# n8n-nodes-gravitysocial

[![npm version](https://img.shields.io/npm/v/n8n-nodes-gravitysocial.svg)](https://www.npmjs.com/package/n8n-nodes-gravitysocial)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-gravitysocial.svg)](https://www.npmjs.com/package/n8n-nodes-gravitysocial)

This is an n8n community node that lets you integrate [GravitySocial](https://social.gravitywrite.com) with your n8n workflows.

GravitySocial is a self-hosted social media management software that helps you schedule and manage your social media content across multiple platforms including Facebook, Twitter/X, Instagram, LinkedIn, Pinterest, TikTok, YouTube, and more.

[n8n](https://n8n.io/) is a workflow automation platform.

## 🚀 Installation

### Automatic - From n8n UI (Recommended)

1. Navigate to **Settings** → **Community Nodes** in your n8n instance
2. Click **Install**
3. Enter `n8n-nodes-gravitysocial` in the package name field
4. Click **Install** to add it to your n8n instance

### Manual - Command Line Installation

Use this method if your n8n instance doesn't support installation through the in-app GUI.

#### Docker Installation

Access your Docker container:
```bash
docker exec -it <n8n_container_name> sh
```

Create `~/.n8n/nodes` if it doesn't already exist, and navigate into it:

```bash
mkdir ~/.n8n/nodes
cd ~/.n8n/nodes
npm init -y
```

Install the GravitySocial node package:

```bash
npm install n8n-nodes-gravitysocial
```

Restart your n8n instance to load the new node.

#### Non-Docker Installation

Navigate to ` ~/.n8n`, and check if a `custom` folder exists. If not, create it, then add a new package.json file inside.

```bash
mkdir -p ~/.n8n/custom
npm init -y
```

Then, install the GravitySocial node package:

```bash
npm install n8n-nodes-gravitysocial
```

Restart n8n to load the new node.

## 📋 Operations

### 📝 Posts
| Operation | Description |
|-----------|-------------|
| **Create** | Create a new social media post with content, media, and scheduling options |
| **Get** | Retrieve a specific post by UUID |
| **Get Many** | Retrieve multiple posts with filtering by status, account, or tags |
| **Update** | Update an existing post's content, media, or schedule |
| **Delete** | Delete a single post |
| **Delete Bulk** | Delete multiple posts at once |
| **Schedule** | Schedule a post |
| **Add to Queue** | Add a post to the publishing queue |
| **Approve** | Approve a post for publishing |

### 👥 Accounts
| Operation | Description |
|-----------|-------------|
| **Get** | Retrieve details of a specific social media account |
| **Get Many** | List all connected social media accounts in your workspace |

### 🖼️ Media
| Operation | Description |
|-----------|-------------|
| **Upload** | Upload images or videos |
| **Get** | Retrieve a specific media file by UUID |
| **Get Many** | List all media files in your workspace |
| **Update** | Update media file data (Alt Text) |
| **Delete** | Delete a media file from your workspace |

### 🏷️ Tags
| Operation | Description |
|-----------|-------------|
| **Create** | Create a new tag with name and color |
| **Get** | Retrieve a specific tag by UUID |
| **Get Many** | List all tags in your workspace |
| **Update** | Update tag properties (name, color) |
| **Delete** | Delete a tag from your workspace |

## 🔑 Credentials Setup

### Prerequisites
1. A running GravitySocial instance
2. Admin access to generate API tokens

### Steps to Configure

1. **Generate API Token in GravitySocial:** 
   - Read the [GravitySocial API documentation](https://docs.gravitywrite.com/api/#generate-a-token) to learn how to generate an API token.
2. **Configure in n8n:**
   - In n8n, go to **Overview** → **Create Workflow**
   - Open nodes panel
   - Search for "GravitySocial"
   - Add an **GravitySocial** action to your workflow
   - Click on **Credentials** → **Create new credential**
   - Enter the following:
     - **GravitySocial URL**: Your GravitySocial instance URL with core path (e.g., `https://social.gravitywrite.com`)
     - **Access Token**: The token you generated in step 1
   - Click **Save**

## 🔧 Workspace UUID

All operations require a Workspace UUID. To find yours:

1. Log in to GravitySocial
2. Navigate to **Admin Console** -> **Workspaces**
3. Click **View** icon for your workspace.
4. Find the UUID in the **Usage in API** section.

## 📊 Supported Social Platforms

GravitySocial supports posting to:
- ✅ Facebook Pages
- ✅ X
- ✅ Instagram (Business accounts)
- ✅ LinkedIn (Profiles & Pages)
- ✅ Pinterest
- ✅ YouTube
- ✅ Google Business Profile
- ✅ Mastodon
- ✅ Bluesky

## ⚙️ Advanced Features

### Pagination
When using "Get Many" operation for **post** or **media** resource, you can control pagination:
- **Per Page Limit**: Set how many results to return per page (default is 50, max is 100)


### Filtering
Posts can be filtered by:
- **Status**: draft, scheduled, published, failed
- **Account ID**: Filter by specific social account
- **Tag**: Filter by tag name
- **Page**: Navigate through paginated results

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- TypeScript knowledge

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/websitelearners/gw-social-n8n-nodes.git
cd n8n-nodes-gravitysocial

# Install dependencies
npm install

# Build the node
npm run build

# Run in development mode (watch for changes)
npm run dev

# Run linter
npm run lint

# Format code with Prettier
npm run format

# Run tests (if available)
npm test
```

## 📚 Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [GravitySocial Documentation](https://docs.gravitywrite.com)
- [GravitySocial API Reference](https://docs.gravitywrite.com/api)
- [n8n Workflow Examples](https://n8n.io/workflows)
- [Report Issues](https://github.com/inovector/n8n-nodes-gravitysocial/issues)

## 📄 License

[MIT License](https://github.com/inovector/n8n-nodes-gravitysocial/blob/master/LICENSE.md)

## 🤝 Support

Need help? Here's how to get support:

1. **Documentation First**: Check the [GravitySocial docs](https://docs.gravitywrite.com)
2. **n8n Community**: Ask in the [n8n community forum](https://community.n8n.io)

## 🎯 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests

## 🙏 Acknowledgments

- The n8n team for the amazing workflow automation platform
- The GravitySocial team behind the coolest self-hosted social media management tool
- All contributors who help improve this node

---

**Made with ❤️ by [GravityWrite](https://gravitywrite.com)**

*Star ⭐ this repository if you find it helpful!*