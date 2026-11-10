# GenGuardX MCP tools

Tool names are the server's names; a client may add a prefix, such as
`mcp__plugin_genguardx_genguardx__`.

## Read-only tools

Call these freely:

- Catalog: `list_ggx_objects`, `get_ggx_object`, `describe_ggx_object_type`
- Docs: `search_ggx_documentation`, `list_ggx_documentation_pages`, `fetch_ggx_documentation_page`
- Evaluations: `list_ggx_pipeline_chats`, `get_ggx_pipeline_chat`, `list_ggx_simulations`, `get_ggx_simulation`, `get_ggx_simulation_figure`
- Feedback: `list_ggx_annotation_feedback`, `get_ggx_annotation_record`, `list_ggx_feedback_portal_sessions`, `get_ggx_feedback_portal_session`
- Governance: `get_ggx_workflow_status`, `list_ggx_project_members`
- `health`

## Tools that change GGX

Before you call one of these, say what it will do and wait for the user to agree. Ask again for each new change.

| Tool | What it does |
| --- | --- |
| `create_ggx_object` | Creates an object |
| `update_ggx_object` | Edits an object in place. There is no new version and no undo |
| `delete_ggx_object` | Deletes an object for good. `confirm_name` must match the stored name |
| `set_ggx_workflow_status` | Submits an object for approval or moves it in its workflow |
| `review_ggx_object` | Records an approve or reject decision as the signed-in user |
| `assign_ggx_project_role` | Adds a project role to a user or team |
| `set_ggx_project_roles` | Replaces all project roles of a user or team. Roles left out are removed |
| `run_ggx_pipeline_chat` | Runs a pipeline and saves the chat. It can call models and cost money |
| `rate_ggx_chat_message` | Marks a reply valid or invalid |
| `start_ggx_simulation` | Starts a background evaluation job. It can be long and costly |
| `start_ggx_feedback_portal_session`, `chat_ggx_feedback_portal`, `end_ggx_feedback_portal_session` | Open, run and close a test session on a feedback portal |
