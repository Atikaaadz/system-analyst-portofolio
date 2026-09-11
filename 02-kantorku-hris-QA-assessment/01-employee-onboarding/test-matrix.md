# Test Matrix

| ID   | Scenario                                                       | Expected Result                                                               | Priority |
| ---- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| TC01 | Select the “Employee Onboarding” menu                          | Display the employee onboarding page.                                         | Critical |
| TC02 | Fill out all forms in accordance with the requirements.        | Data can be saved either after submission or as a draft.                      | Critical |
| TC03 | Failure to fill out one or more of the required forms.         | Displays an error message and indicates the fields that need to be corrected. | Critical |
| TC04 | Submitting the form with invalid input data.                   | Displays errors and indicates which fields need to be corrected.              | Critical |
| TC05 | Save the input data to a draft even if it is not yet complete. | Data can be saved as a draft and displayed.                                   | High     |
| TC06 | update the data stored in the draft.                           | Input data can be displayed and updated.                                      | High     |
| TC07 | The uploaded document exceeds the size limit.                  | Upload failed.                                                                | Critcal  |
| TC08 | Upload a file in .word format.                                 | Upload failed.                                                                | Critical |
| TC09 | Upload documents in accordance with the requirements.          | Uploaded successfully.                                                        | Critical |
| TC10 | Refresh after saving a draft.                                  | The data in the draft remains intact.                                         | High     |
| TC11 | Double-click the submit button.                                | There are no duplicate records in the saved data.                             | High     |
