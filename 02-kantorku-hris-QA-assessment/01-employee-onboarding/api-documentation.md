# Employee Onboarding API Documentation

## 1. API Overview

The Employee Onboarding API is used to manage the employee onboarding process, including saving employee data as a draft, submitting completed onboarding data, retrieving saved drafts, and deleting drafts.

### Base URL

```text
/api/employee-onboardings
```

---

## 2. Endpoint Summary

| ID     | Method | Endpoint                               | Purpose                                    |
| ------ | ------ | -------------------------------------- | ------------------------------------------ |
| API-02 | POST   | `/api/employee-onboardings/draft`      | Save employee onboarding data as a draft   |
| API-03 | POST   | `/api/employee-onboardings/submit`     | Submit completed employee onboarding data  |
| API-04 | GET    | `/api/employee-onboardings/draft/{id}` | Retrieve a saved employee onboarding draft |
| API-06 | DELETE | `/api/employee-onboardings/draft/{id}` | Delete a saved employee onboarding draft   |

---

# 3. API-02 — Save Draft

Save employee onboarding data as a draft. This endpoint allows the user to save incomplete onboarding data and continue the process later.

### Endpoint

```http
POST /api/employee-onboardings/draft
```

### Content-Type

```http
application/json
```

### Request Body

```json
{
  "full_name": "Testone",
  "email": "testone@example.com",
  "phone": "08123456789",
  "date_of_birth": "2000-01-01",
  "department": "Engineering",
  "position": "QA Engineer",
  "employment_type": "Permanent",
  "join_date": "2026-08-20"
}
```

### Request Parameters

| Field             | Type   | Required | Description                                     |
| ----------------- | ------ | -------- | ----------------------------------------------- |
| `full_name`       | String | Yes      | Employee's full name                            |
| `email`           | String | Yes      | Employee's email address                        |
| `phone`           | String | Yes      | Employee's phone number                         |
| `date_of_birth`   | String | Yes      | Employee's date of birth in `YYYY-MM-DD` format |
| `department`      | String | Yes      | Employee's department                           |
| `position`        | String | Yes      | Employee's position                             |
| `employment_type` | String | Yes      | Type of employment                              |
| `join_date`       | String | Yes      | Employee's joining date in `YYYY-MM-DD` format  |

### Success Response

**HTTP Status: `200 OK`**

```json
{
  "success": true,
  "message": "Draft saved successfully",
  "data": {
    "id": 1001,
    "status": "draft"
  }
}
```

### Error Response

**HTTP Status: `422 Unprocessable Entity`**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Email is required"
  }
}
```

### Business Rules

* Employee data can be saved without completing the entire onboarding process.
* The onboarding record must have a `draft` status after successfully saving.
* Required field validation must be performed before saving the draft.
* A draft can be retrieved and continued later.
* A draft can be deleted using the Delete Draft endpoint.

---

# 4. API-03 — Submit Employee Onboarding

Submit completed employee onboarding data.

This endpoint is used when all required employee information and required documents have been provided.

### Endpoint

```http
POST /api/employee-onboardings/submit
```

### Content-Type

```http
multipart/form-data
```

### Request Body

| Field                 | Type | Required | Example               | Description                  |
| --------------------- | ---- | -------- | --------------------- | ---------------------------- |
| `full_name`           | Text | Yes      | `Testone`             | Employee's full name         |
| `email`               | Text | Yes      | `testone@example.com` | Employee's email address     |
| `phone`               | Text | Yes      | `08123456789`         | Employee's phone number      |
| `date_of_birth`       | Text | Yes      | `2000-01-01`          | Employee's date of birth     |
| `department`          | Text | Yes      | `Engineering`         | Employee's department        |
| `position`            | Text | Yes      | `QA Engineer`         | Employee's position          |
| `employment_type`     | Text | Yes      | `Permanent`           | Type of employment           |
| `join_date`           | Text | Yes      | `2026-08-20`          | Employee's joining date      |
| `identity_document`   | File | Yes      | `KTP_Test.pdf`        | Employee identity document   |
| `employment_contract` | File | Yes      | `Contract_Test.pdf`   | Employee employment contract |

### Example Request

```text
full_name: Testone
email: testone@example.com
phone: 08123456789
date_of_birth: 2000-01-01
department: Engineering
position: QA Engineer
employment_type: Permanent
join_date: 2026-08-20
identity_document: KTP_Test.pdf
employment_contract: Contract_Test.pdf
```

### Success Response

**HTTP Status: `200 OK`**

```json
{
  "success": true,
  "message": "Employee onboarding submitted successfully",
  "data": {
    "id": 1001,
    "status": "submitted"
  }
}
```

### Error Response

**HTTP Status: `422 Unprocessable Entity`**

```json
{
  "success": false,
  "message": "Employee onboarding cannot be submitted",
  "errors": {
    "identity_document": "Document is required"
  }
}
```

### Business Rules

* All required employee information must be completed before submission.
* Required onboarding documents must be uploaded.
* The employee onboarding record must pass validation before submission.
* A successfully submitted onboarding record has a `submitted` status.
* A submitted onboarding record is considered completed and is no longer treated as a draft.

---

# 5. API-04 — Retrieve Saved Draft

Retrieve the details of a previously saved employee onboarding draft.

### Endpoint

```http
GET /api/employee-onboardings/draft/{id}
```

### Example Request

```http
GET /api/employee-onboardings/draft/1001
```

### Path Parameter

| Parameter | Type    | Required | Description                         |
| --------- | ------- | -------- | ----------------------------------- |
| `id`      | Integer | Yes      | ID of the employee onboarding draft |

### Success Response

**HTTP Status: `200 OK`**

```json
{
  "success": true,
  "data": {
    "id": 1001,
    "full_name": "Testone",
    "email": "testone@example.com",
    "phone": "08123456789",
    "date_of_birth": "2000-01-01",
    "department": "Engineering",
    "position": "QA Engineer",
    "employment_type": "Permanent",
    "join_date": "2026-08-20",
    "status": "draft",
    "documents": {
      "identity_document": {
        "uploaded": true,
        "file_name": "KTP_Test.pdf",
        "file_type": "application/pdf"
      },
      "employment_contract": {
        "uploaded": true,
        "file_name": "Contract_Test.pdf",
        "file_type": "application/pdf"
      }
    }
  }
}
```

### Business Rules

* The provided ID must belong to an existing onboarding draft.
* Only records with `draft` status can be retrieved through this endpoint.
* The response contains the employee data currently stored in the draft.
* Uploaded document information is returned as metadata.

---

# 6. API-06 — Delete Draft

Delete a previously saved employee onboarding draft.

### Endpoint

```http
DELETE /api/employee-onboardings/draft/{id}
```

### Example Request

```http
DELETE /api/employee-onboardings/draft/1001
```

### Path Parameter

| Parameter | Type    | Required | Description                         |
| --------- | ------- | -------- | ----------------------------------- |
| `id`      | Integer | Yes      | ID of the employee onboarding draft |

### Success Response

**HTTP Status: `200 OK`**

```json
{
  "success": true,
  "message": "Draft deleted successfully"
}
```

### Business Rules

* The provided ID must belong to an existing draft.
* Only onboarding records with `draft` status can be deleted through this endpoint.
* After successful deletion, the draft can no longer be retrieved using the Retrieve Draft endpoint.
* Associated draft documents should also be handled according to the application's file management rules.

---

# 7. Onboarding Status

The employee onboarding process uses the following statuses:

| Status      | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `draft`     | Employee onboarding data has been saved but has not been submitted     |
| `submitted` | Employee onboarding data has been successfully completed and submitted |

