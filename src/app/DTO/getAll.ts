export interface GetAll {

    'encounterid': string,
    'orderDocID': string,
    'requestDate': string,
    'requestDate_Persian': string,
    'orderSheetCode': string,
    'requestLocation': string,
    'reportDate': string,
    'reportDate_Persian': string,
    'orderTemplateName': string,
    'laboratory_Tests': [
        {
            'orderDocID': string,
            'serviceEventID': string,
            'masterService_Name': string,
            'laboratory_Results': [
                {
                    'observationID': string,
                    'isParalell': string,
                    'testName': string,
                    'testValue': string,
                    'rangeCaption': string,
                    'lowerRange': string,
                    'upperRange': string,
                    'unit': string
                },

            ]
        }
    ]

}



