# Loan Management Module for Banking Application

## Overview
This project implements a microservice architecture for a loan management module within an existing banking application. The goal is to automate various steps of the loan process, from application submission to final credit decision, using a set of interconnected services.

## Requirements
The module is designed to:
1. Accept and process client applications and uploaded documents.
2. Assess client eligibility and repayment terms through commercial and risk management evaluations.
3. Utilize OCR technology for document processing.
4. Notify clients about the approval status.
5. Generate and manage credit agreements and amortization tables.

## Architecture
The architecture is composed of several microservices, each dedicated to a part of the loan process:
![Untitled-2024-05-05-1057](https://github.com/anasch07/Software-Architecture-Loan-Management-Microservices/assets/98924792/fb7b65d0-fe55-4a93-9996-4ef6df6b3722)

### Client Service
- **Functionality**: Handles client interactions, such as form submissions and document uploads.
- **Flow**: Receives initial applications and documents, forwards documents to the Media Service for storage, and passes application data to the Commercial Service via a broker.

### Database Service
- **Functionality**: Manages database interactions.
- **Flow**: Provides interfaces for CRUD operations on the Loan data.

### Media Service
- **Functionality**: Manages document storage in an S3 bucket.
- **Flow**: Stores documents uploaded by clients and provides URLs back to the Client Service for reference in the database.

### Commercial Service
- **Functionality**: Assesses the borrower’s eligibility based on financial data.
- **Flow**: Retrieves document data via OCR Service, computes initial scoring, and passes the application to the Risk Management Service through a broker.

### OCR Service
- **Functionality**: Extracts information from uploaded documents.
- **Integration**: Utilized by the Commercial and Risk Management Services to process financial documents.

### Risk Management Service
- **Functionality**: Evaluates financial risks associated with the loan.
- **Flow**: Accesses data from the Central Bank database via the External Access Service to check for existing financial commitments, computes final scoring, and send it to the Credit Service.

### External Access Service
- **Functionality**: Provides secure access to the Central Bank database for the Risk Management Service.
- **Flow**: Facilitates data retrieval from the Central Bank database, essential for comprehensive risk assessment.

### Credit Service
- **Functionality**: Finalizes the loan process.
- **Flow**: Generates credit agreements and client related documents, stores them in the Loan Database..

### Notification Service
- **Functionality**: Sends notifications about the loan application status.
- **Flow**: Communicates with clients based on updates from other services.

## Message Brokers
- **Purpose**: Enable asynchronous communication and event-driven interactions between services.
- **Brokers**:
  - Between Client and Commercial Services.
  - Between Commercial and Risk Management Services.
  - Fronting the Notification Service.

## Sequence Diagram
![image](https://github.com/anasch07/Software-Architecture-Loan-Management-Microservices/assets/98924792/00c624d5-9c49-481b-adee-8577d4cc478c)
- **Link**: https://bit.ly/4a8nLx5
  

## Demo
This demo video demonstartes the complete functionality of the module, showcasing real-time data flow and interactions across services.


[![Demo Video](http://img.youtube.com/vi/K3jzIABGb20/0.jpg)](https://youtu.be/K3jzIABGb20)

