# Test Data Automation

## Objective

This automation script was created to reduce repetitive manual data entry during QA testing.

## Data to be Created

### Positions

10 positions are generated automatically.

### Area

* Create Company Unit: Area
* Create 20 Areas

### Sub Area

* Create Company Unit: Sub Area
* Create 20 Sub Areas

## Automation Flow

```text
Start
 ↓
Authenticate
 ↓
Get Authentication Token
 ↓
Create Positions
 ↓
Create Company Unit: Area
 ↓
Create 20 Areas
 ↓
Create Company Unit: Sub Area
 ↓
Create 20 Sub Areas
 ↓
Display Results
 ↓
End
```

## Authentication

The script supports authentication through an environment variable.

Example:

```text
API_TOKEN=<YOUR_TOKEN>
```

The actual token is never stored in the repository.

## Cleanup

After testing, the generated data should be removed manually to restore the application to its previous state.

## Benefits

* Reduces repetitive manual work
* Reduces data-entry errors
* Makes test data creation faster
* Provides reusable automation
