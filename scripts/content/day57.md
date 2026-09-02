# Team Workflow Automation

## Learning Objectives

- Understand how to automate workflows within a team (internal operations)
- Learn to design shared workflows, approvals, and notifications that coordinate people
- Build automations that connect team tools (PM, chat, docs, CRM)
- Understand the principles of human-in-the-loop workflow design
- Apply automation to your own agency team (and to sell to clients)

## From Client Automation to Team Automation

So far, most of your work automated **client-facing** processes. Team workflow automation is about the collaboration INSIDE an organization — how work gets assigned, tracked, reviewed, approved, and communicated among people.

This is valuable two ways:
1. **For your own agency** — run your (even tiny) team efficiently
2. **As a service you sell** — every business has an internal team with tangled workflows

## What Team Workflow Automation Solves

Teams suffer from:
- **Lost handoffs** — "I sent it, did they get it?" (no visibility)
- **Silent bottlenecks** — work stuck waiting for approval, no one knows
- **Duplication** — two people doing the same thing
- **Context switches** — notification overload
- **Approval chaos** — unstructured yes/no loops
- **Reporting burden** — collecting status updates manually

Automation fixes visibility, routing, and notification — so people focus on the work, not tracking it.

## The Core Team Workflow Patterns

### 1. Assignment & Routing
Automatically assign work to the right person based on rules/load.

```
New task with category "design"
  → route to the designer
  → notify them in Slack
  → if overloaded, queue/backup assignee
```

### 2. Approval Workflows
Route decisions through the right reviewers with clear status.

```
Expense report submitted
  → notify the manager
  → manager approves/rejects
  → auto-notify finance
  → log the decision
```

### 3. Notification & Escalation
Notify relevant people at the right time; escalate when stale.

```
Task stays "in review" > 48h
  → remind the reviewer
  → after 72h, escalate to their manager
```

### 4. Status Synchronization
Keep status consistent across tools (PM tool, docs, CRM) automatically.

```
Task marked "done" in Asana
  → update the client project doc
  → send weekly status
```

## Designing These in Python / No-Code

Here's a Python sketch of a team workflow router with escalation:

```python
from datetime import datetime, timedelta


class TeamWorkflow:
    def __init__(self):
        self.tasks = {}      # task_id -> task state
        self.team = {        # assignees and their role
            "ana": {"role": "designer", "workload": 0},
            "ben": {"role": "writer", "workload": 0},
        }
    
    def assign_task(self, task_id, category, requester):
        """Route a task to the right role based on category."""
        # Simple routing table
        role_for = {
            "design": "designer",
            "content": "writer",
            "development": "developer",
        }
        role = role_for.get(category, "generalist")
        
        # Find least-loaded assignee for that role
        candidates = [p for p, info in self.team.items() 
                      if info["role"] == role]
        assignee = min(candidates, key=lambda p: self.team[p]["workload"]) \
                   if candidates else "backlog"
        
        self.tasks[task_id] = {
            "assignee": assignee, "category": category,
            "requester": requester, "status": "assigned",
            "created": datetime.now(), "last_activity": datetime.now(),
        }
        self._notify(assignee, f"You've been assigned task {task_id}")
        return {"task_id": task_id, "assignee": assignee}
    
    def _notify(self, person, message):
        # In production, post to Slack/webhook
        print(f"[NOTIFY {person}] {message}")
    
    def advance(self, task_id, new_status, by=None):
        """Move a task through statuses with notifications."""
        task = self.tasks[task_id]
        task["status"] = new_status
        task["last_activity"] = datetime.now()
        self._notify(task["requester"], f"Task {task_id} is now {new_status}")
    
    def check_escalations(self):
        """Escalate stale tasks automatically."""
        now = datetime.now()
        escalated = []
        for tid, task in self.tasks.items():
            if task["status"] in ("in_review", "assigned"):
                age = now - task["last_activity"]
                if age > timedelta(hours=72):
                    escalated.append(tid)
                    self._notify("manager", f"Task {tid} is stale, needs attention")
        return escalated
```

## The Human-in-the-Loop Principle

Team automation must keep **humans making the judgment calls**, with automation handling routing, tracking, and notifications. Design principle:

```
AUTOMATION SHOULD:
✓ Route work to the right person
✓ Track status and remind
✓ Escalate when stuck
✓ Keep everyone informed
✓ Enforce process steps

AUTOMATION SHOULD NOT (without approval):
✗ Make subjective approvals
✗ Auto-assign sensitive reviews without rules
✗ Silently change decisions
✗ Spam everyone
```

### Approval Gate Pattern

```python
def require_approval(work_item, approver, on_approve, on_reject):
    """Block until a human approves, with notifications."""
    print(f"[APPROVAL] {work_item} awaiting {approver}")
    
    # In production: wait for approval via a form/webhook
    decision = input(f"{approver}: approve? (y/n) ").lower()
    
    if decision == "y":
        print(f"[APPROVED] running: {on_approve}")
        return on_approve()
    else:
        print(f"[REJECTED] running: {on_reject}")
        return on_reject()
```

## The Team Status Bot

Automate the recurring "status update" chore. Instead of a meeting or email parade, a bot collects updates:

```python
def collect_weekly_updates(members):
    """Ask each member for their 3-part status update."""
    updates = []
    for member in members:
        # In production, send a form/question to Slack
        print(f"\n=== {member} ===")
        done = input("What did you complete? ")
        doing = input("What are you working on? ")
        blocked = input("Any blockers? ('none' if none) ")
        updates.append({
            "member": member, "done": done,
            "doing": doing, "blocked": blocked,
        })
    return updates
```

## Notifications: Minimize, Don't Maximize

Notification overwhelm is a real problem. Follow these rules:
- **Notify on state changes** that matter, not every micro-event
- **Consolidate** — batch notifications (e.g., a daily digest) for low-urgency items
- **Escalate** — only high-priority events should page someone immediately
- **Give context** — a good notification says WHAT changed and WHY it matters

```python
def smart_notify(person, message, priority):
    """Route notifications by priority."""
    channels = {
        "high": "immediate (Slack DM + email)",
        "medium": "channel message",
        "low": "batched daily digest",
    }
    channel = channels.get(priority, "batched daily digest")
    print(f"[{priority.upper()}] {person}: {message} → {channel}")
```

## Team Automation for Your Own Agency

Even a solo founder benefits by setting up team-style automation with yourself and AI/VA helpers:

- **Inbox → triage bot** categorizes incoming and routes to queue
- **Project board automation** moves tasks on status changes
- **Recurring meeting notes** auto-drafted and archived
- **Client update bot** reminds you to send weekly updates (Day 55)
- **Billing/invoicing reminders** auto-triggered

## Selling Team Automation to Clients

The pitch: "Your team wastes hours tracking work instead of doing it. We automate assignments, approvals, and notifications so everyone knows what to do, and nothing falls through the cracks."

Good use cases to sell:
- Marketing team content approval flows
- Operations team issue routing
- Proposal/sales approval workflows
- Client project handoffs (design → dev → review)
- Weekly reporting (from statuses)

## Key Takeaways

- Team workflow automation coordinates PEOPLE (routing, approvals, notifications, status)
- Core patterns: assignment/routing, approvals, notification/escalation, status sync
- Always keep humans in the loop for judgment calls — automation handles routing/tracking
- Minimize notifications: notify on meaningful state changes, batch low-priority, escalate high-priority
- Escalate stale work automatically so nothing dies silently
- Apply it to your own agency first (small team / solo + AI/VA)
- Team automation is a sellable service: management loves visible, unblocked workflows

## Practice Challenge

**Objective:** Build a team workflow automation system.

1. Build the `TeamWorkflow` class with assignment, status, and escalation
2. Add an approval-gate workflow (create → review → approve → done) with notifications at each step
3. Implement smart notifications (route by priority: DM, channel, digest)
4. Simulate a realistic scenario: a content team where a draft goes writer → reviewer → approval, with one task that gets stuck and escalates
5. Design a "team status bot" that collects and consolidates weekly updates into a single report
6. Write a short client pitch for team workflow automation (who benefits, what you deliver)

**Deliverable:** `team_workflow.py` (routing, approval, escalation, notifications), a simulated run showing the full flow, the status bot, and the client pitch.
