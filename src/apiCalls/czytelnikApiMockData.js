export const czytelnikList = [
    {
        "_id": 1,
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "adres": "Warszawska 22",
    },
    {
        "_id": 2,
        "imie": "Marcin",
        "nazwisko": "Jankowski",
        "adres": "Berlińska 2g",
    }
]

export const czytelnikDetailsList = [
    {
        "_id": 1,
        "imie": "Jan",
        "nazwisko": "Kowalski",
        "adres": "Warszawska 22",
        "wypozyczenia": [
            {
                "_id": 1,
                "dateFrom": "2001-01-01T00:00:00.000Z",
                "dateTo": "2009-01-01T00:00:00.000Z",
                "czyt_id": 1,
                "ksi_id": 1,
                "ksiazka": {
                    "_id": 1,
                    "tytul": "HR",
                }
            },
            {
                "_id": 2,
                "dateFrom": "2009-01-02T00:00:00.000Z",
                "dateTo": null,
                "czyt_id": 1,
                "ksi_id": 2,
                "ksiazka": {
                    "_id": 2,
                    "name": "Sales",
                }
            }
        ]
    },
    {
        "_id": 2,
        "imie": "Marcin",
        "nazwisko": "Jankowski",
        "adres": "Berlińska 2g",
        "wypozyczenia": [
            {
                "_id": 3,
                "dateFrom": "2011-02-02T00:00:00.000Z",
                "dateTo": "2019-01-01T00:00:00.000Z",
                "czyt_id": 2,
                "ksi_id": 1,
                "ksiazka": {
                    "_id": 1,
                    "tytul": "HR",
                }
            }
        ]
    }
]