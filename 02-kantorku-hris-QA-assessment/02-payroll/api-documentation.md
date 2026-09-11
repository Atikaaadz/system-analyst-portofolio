# Payroll API Documentation

## 1. API Overview

This document describes the API endpoints identified during testing of the HRIS Payroll flow.

The documentation is based on the API requests and responses observed during testing. Only endpoints that could be identified and verified are documented.

---

# 2. Endpoint List

| No | Activity          | Method | Endpoint                            | Status | Description                            |
| -- | ----------------- | ------ | ----------------------------------- | ------ | -------------------------------------- |
| 1  | Run Payroll       | GET    | `/v2/hris/payroll/list`             | 200    | Retrieving payroll data.               |
| 2  | Run Payroll       | POST   | `/v2/hris/payroll/action/calculate` | 200    | Performing payroll calculations.       |
| 3  | Run Payroll       | GET    | `/v2/hris/payroll/list`             | 200    | Retrieving the calculation results.    |
| 4  | Adjust Benefit    | POST   | `/v2/hris/payroll/action/calculate` | 200    | Recalculate payroll.                   |
| 5  | Adjust Benefit    | GET    | `/v2/hris/payroll/list`             | 200    | Retrieving the latest payroll results. |
| 6  | Adjust Attendance | -      | Not identified                      | -      | No API found to change attendance.     |

> **Note:** The same endpoint may be used by different activities. The endpoint list represents the API requests identified during testing, while the API contract section describes the request and response details that were actually observed.

---

# 3. API Contracts

## 3.1 Retrieve Payroll Data

### Endpoint

```http
GET /v2/hris/payroll/list
```

### Purpose

Retrieve payroll data for the selected payroll period.

### Request Parameters

| Parameter       | Example Value                          | 
| --------------- | -------------------------------------- |
| `id_eq`         | `8577f08a-e45a-45d8-8de6-08d67d8abef6` | 
| `company_id_eq` | `0e0f9370-f7d8-49f6-a9a8-acc674c8925d` | 
| `with`          | `recipientCount`                       | 
| `with`          | `payment_partner`                      | 
| `with`          | `author`                               | 
| `for_feature`   | `payroll`                              | 

### Example Request

```text
GET /v2/hris/payroll/list?id_eq=8577f08a-xxxxxx-08d67d8abef6&company_id_eq=0e0f9370-xxxxx-acc674c8925d&with=recipientCount&with=payment_partner&with=author&for_feature=payroll
```

### Response

**HTTP Status: `200 OK`**

```json
{
  "code": 200,
  "messageId": "SUCCESS",
  "data": {
    "docs": [
      {
        "id": "...",
        "name": "Salary Jul 2026",
        "period": "2026-07-01",
        "status": "draft",
        "totalDisbursement": "8224000",
        "recipientCount": 5,
        "recipientLabel": "5 Employees"
      }
    ]
  }
}
```

## 3.2 Calculate Payroll

### Endpoint

```http
POST /v2/hris/payroll/action/calculate
```

### Purpose

Perform payroll calculation based on the selected payroll record.

### Request Body

```json
{
  "id": "371f328d-xxxxxx-58658902bf87"
}
```

### Request Parameters

| Parameter | Type   | Example                                |
| --------- | ------ | -------------------------------------- |
| `id`      | String | `371f328d-xxxxxx-58658902bf87` |

### Response

**HTTP Status: `200 OK`**

```json
{
  "id": "9ddc6f4a-xxxxxx-92db9d21f053",
  "payrollId": "8577f08a-e45a-45d8-8de6-08d67d8abef6",
  "payrollRecipientId": "...",
  "name": "PPh 21",
  "type": "deduction",
  "calculationType": "fixed",
  "amount": "0",
  "grossIncomeMonthly": "3520000",
  "period": "2026-07-01T00:00:00Z"
}
```

# 4. Adjust Benefit

The **Adjust Benefit** activity was observed to use the payroll calculation endpoint.

### Endpoint

```http
POST /v2/hris/payroll/action/calculate
```

### Purpose

Recalculate payroll based on the adjustment process.

### Method

```http
POST
```

### Status Observed

```text
200 OK
```

The same payroll calculation endpoint was also observed during the **Run Payroll** flow.

### Related Endpoint

```http
GET /v2/hris/payroll/list
```

This endpoint was observed to retrieve the latest payroll results after the calculation process.

---

# 5. Adjust Attendance Per Employee

### API Status

```text
Not identified
```

During testing, the **Adjust Attendance Per Employee** function could not be verified through an identified API request.

No UI action or API request was found that could be verified as a function for modifying an employee's attendance.

### Endpoint

```text
-
```

### Method

```text
-
```

### Request

```text
-
```

### Response

```text
-
```

### Testing Finding

"Adjust Attendance Per Employee" could not be found in the available Attendance flow during testing. No UI action or API request was found that could be verified as a function for modifying an employee's attendance.

### Documentation Note

This finding does **not** confirm that the system has no attendance adjustment API at all. It only indicates that no corresponding API request was identified or verified during the tested flow.

---


# 7. Testing Scope and Limitations

This API documentation is based on the endpoints identified during the tested HRIS Payroll flow. For features where no API request was identified, such as **Adjust Attendance Per Employee**, the result is documented as **Not identified** rather than creating an assumed API contract.
Therefore, the absence of an endpoint in this document does not necessarily mean that the endpoint does not exist in the system. It means that the endpoint was not identified or verified within the tested flow.
