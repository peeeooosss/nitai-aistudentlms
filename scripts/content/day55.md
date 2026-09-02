# Delivering AI Projects

## Learning Objectives

- Master the end-to-end process of delivering an AI automation project to a client
- Learn project phases, communication rhythms, and milestone management
- Prepare for the live interactive session on project delivery

## Live Session Overview

This is a **LIVE_INTERACTIVE** day:

1. **Recap** — service packaging (Day 52) + proposals (Day 54) (15 min)
2. **Lecture/Demo** — the project delivery lifecycle (45 min)
3. **Hands-on exercises** — plan and manage a delivery (60 min)
4. **Discussion** — delivery challenges (15 min)
5. **Q&A** (15 min)

## Recap: From Sold to Delivered

You've sold a package and the client signed the proposal. Now the real work: delivering the project on time, on scope, and to a delighted client. Poor delivery kills agencies — great delivery generates referrals and retainers.

Delivery is a **process, not an event**. It has distinct phases, each with its own goals and communication.

## The Project Delivery Lifecycle

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ KICKOFF │─▶│ BUILD   │─▶│ REVIEW  │─▶│ LAUNCH  │─▶│ STABILIZE│
│ align   │  │ deliver │  │ QA +    │  │ deploy  │  │ optimize │
│ & scope │  │ weekly  │  │ feedback│  │ go-live │  │ + report │
└─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────┘
```

### Phase 1: Kickoff
- Confirm scope and success criteria (from proposal)
- Collect access/logins and needed assets
- Agree on communication + cadence (weekly check-in, shared doc)
- Set the milestone schedule
- Document everything in a shared project space

### Phase 2: Build
- Execute the build (using your technical skills from this phase)
- Follow an internal QA process as you go
- Provide **weekly status updates** so the client is never in the dark
- Log decisions and changes (scope change management!)

### Phase 3: Review (QA + Acceptance)
- Run your own quality checks (see Day 58)
- Demo the deliverable to the client
- Collect feedback, fix within agreed revision rounds
- Get formal acceptance sign-off

### Phase 4: Launch
- Deploy to production
- Do a controlled rollout (pilot then full)
- Monitor immediately for issues
- Communicate launch + what to expect

### Phase 5: Stabilize
- Monitor performance and fix any post-launch issues
- Deliver the initial results report
- Transition to the retainer (monitoring/tuning) or close out

## The Weekly Rhythm (the key to trust)

The single most important delivery habit: **never leave the client wondering what's happening.**

```
WEEKLY CLIENT UPDATE (short, structured):
- ✅ What was completed this week
- 🚧 What's in progress / being worked on
- 🆘 Blockers or needs (what I need from you)
- 📅 Next week's plan
- 📈 (optional) early results/observations
```

Send this every week even if there's little to say. Silence breeds anxiety; regular communication builds trust.

## Scope Change Management

Scope creep is the #1 profit-killer. Handle it professionally:

```
SCOPE CHANGE FLOW:
1. Client requests something beyond scope
2. Acknowledge + note it (never silently absorb or silently refuse)
3. Categorize: quick fix (≤ X hrs, do it) vs. real change
4. For real changes: quote cost/time impact, get written approval
5. Implement and update the plan
```

```python
class ScopeChange:
    def __init__(self):
        self.changes = []
    
    def request(self, description, estimated_hours, approved=False):
        self.changes.append({
            "description": description,
            "hours": estimated_hours,
            "approved": approved,
        })
        return ("Recommend: " + ("Include at no charge (small fix)." 
                if estimated_hours <= 2 
                else f"Quote at {estimated_hours} hrs — awaiting approval."))
    
    def report(self):
        unapproved = [c for c in self.changes if not c["approved"]]
        return {"total_changes": len(self.changes),
                "pending_approval": len(unapproved),
                "unbilled_hours": sum(c["hours"] for c in unapproved)}
```

## The Delivery Checklist

Use a checklist so you never skip a critical step:

```markdown
## Project Delivery Checklist

### Pre-Build
- [ ] Scope + success criteria documented (from proposal)
- [ ] All client access/logins received
- [ ] Communication cadence agreed (weekly update, channel)
- [ ] Milestone schedule set
- [ ] Shared project space created (docs, tasks)

### During Build
- [ ] Weekly status updates sent (every week, without fail)
- [ ] Decisions logged
- [ ] Scope changes tracked & approved
- [ ] Internal QA happening continuously

### Pre-Launch (Review)
- [ ] Full QA test pass completed (functionality, edge cases)
- [ ] Tested live with real data where possible
- [ ] Demo to client
- [ ] Submitted for acceptance
- [ ] Feedback collected + revision rounds used
- [ ] Formal sign-off obtained

### Launch
- [ ] Deployed to production
- [ ] Pilot/controlled rollout where applicable
- [ ] Monitoring active (errors, performance)
- [ ] Client notified of launch + expectations

### Post-Launch (Stabilize)
- [ ] Issues fixed promptly
- [ ] Initial results report delivered
- [ ] Retainer / transition agreed (or clean closeout)
- [ ] Referral ask made
```

## Internal Build Process (Your Side)

Even solo, run a disciplined internal workflow:

```python
def internal_build_tracker():
    """Track the build with statuses."""
    return {
        "discovery_coords": "done",
        "design_architecture": "in_progress",
        "build_core": "todo",
        "test_core": "todo",
        "edge_cases": "todo",
        "client_demo": "todo",
        "deploy": "todo",
        "monitor": "todo",
    }
```

Adopt a simple workflow for each deliverable: **Build → Test → Review → Deploy**. Don't ship something you haven't tested with real sample data and edge cases (see Day 58).

## Handling Difficult Situations

| Situation | Professional response |
|---|---|
| Client wants more than scope | Use the scope-change flow; quote it |
| Deliverable delayed | Communicate EARLY, give revised date + reason, offer mitigation |
| Client unhappy with quality | Listen, identify the gap, fix within revisions or escalate |
| Client unresponsive | Set expectations; try multiple channels; escalate on agreed timeline |
| Mismatch of expectations | Re-anchor on the agreed success criteria (documented at kickoff) |

## Live Session Exercises

### Exercise 1: Kickoff Plan
Take a package you'd sell (Day 52) and write a complete kickoff plan: what you'll confirm, what access you need, what items are on the milestone schedule.

### Exercise 2: Weekly Update
Write a realistic weekly status update for a mid-build project using the 5-part structure. Include at least one "what I need from you" item.

### Exercise 3: Scope Change Scenario
You're delivering a chatbot. The client asks to add "multi-language support" (out of scope). Walk through the scope-change flow and draft the message you'd send.

### Exercise 4: Delivery Checklist
Create a tailored delivery checklist for ONE of your packages (not the generic one — customize it).

### Exercise 5: Demo Script
Write a 10-minute demo script you'd use to show a completed AI automation to a client (what you show, in what order, the story).

## Discussion Topics

1. What's the biggest reason agencies deliver badly, and how do you prevent it?
2. How do you handle a client who's hard to reach but expects results?
3. When should you under-promise and over-deliver vs. just deliver exactly as promised?
4. How do you turn a successful delivery into a retainer or referral?
5. What's the right amount of communication — too little vs. too much?

## Key Takeaways

- Delivery is a process: Kickoff → Build → Review → Launch → Stabilize
- The weekly rhythm (structured updates) is the cornerstone of client trust
- Manage scope changes explicitly — never silently absorb or refuse
- Use checklists to avoid skipped critical steps
- Run an internal Build → Test → Review → Deploy workflow before launching
- Communicate delays early; re-anchor on agreed success criteria when expectations drift
- A successful delivery is your best marketing — convert it into retainer + referrals

## Practice Challenge

**Objective:** Produce a complete delivery plan for one of your packages.

1. Complete all five exercises
2. Assemble a complete "Delivery Plan" document for one package you'd sell that includes:
   - The milestone schedule with dates
   - The weekly update template (filled with one example)
   - The scope-change procedure
   - Your customized delivery checklist
   - Your demo script
   - Your post-launch transition plan (stabilize → retainer)
3. Prepare a 10-minute demo of one of your deliverables for the live session

**Deliverable:** The full Delivery Plan document and a ready-to-present demo for your package.
