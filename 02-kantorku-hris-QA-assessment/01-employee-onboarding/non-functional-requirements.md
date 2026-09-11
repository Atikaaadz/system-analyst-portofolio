# Non-Functional Requirements

| ID   | Category       | Scenario                                                        | Expected Result                                                   | Priority |
|------|----------------|----------------------------------------------------------------|-------------------------------------------------------------------|----------|
| NF01 | Performance    | Open the employee onboarding page.                             | Response time ≤ 2 seconds.                                       | High     |
| NF02 | Performance    | Click the submit button.                                       | Response time ≤ 3 seconds.                                       | High     |
| NF03 | Performance    | Click the save draft button.                                   | Response time ≤ 3 seconds.                                       | High     |
| NF04 | Security       | Access without logging in.                                     | Rejected and redirected to the login page.                       | Critical |
| NF05 | Security       | Uploading files in formats other than those specified, such as .word. | Rejected.                                                        | Critical |
| NF06 | Security       | Upload files larger than 2 MB.                                 | Rejected.                                                        | Critical |
| NF07 | Usability      | Did not fill in the required fields.                            | Displays an error message and the fields that need to be corrected. | High     |
| NF08 | Reability      | Save the data as a draft, then refresh the page.               | Data saved in drafts can still be displayed.                     | High     |
| NF09 | Data Integrity | Submit the data that has been entered.                          | Data stored according to the input.                              | Critical |
| NF10 | Compatibility  | Accessing the page using Edge and Chrome.                       | The page can be loaded and the features can be used.             | Medium   |
