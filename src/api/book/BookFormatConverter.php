<?php


namespace hamstersbooks\api\book;


class BookFormatConverter {

    public function convertList(array $list) {
        $map = []; 
        
        foreach($list as $item) {
            $id = $item->id; 
            if(!array_key_exists($id, $map)) {
                $map[$id] = [
                    "id" => intval($item->id), 
                    "title"=>$item->title, 
                    "isbn"=>$item->isbn,
                    "authors"=>[],
                    "publisher"=> [
                        "name"=>$item->publisher
                    ],
                    "publicationYear" => empty($item->publication_year) ? null : intval($item->publication_year),
                    "addedDate" => $this->toDateTime($item->added_date), 
                    "modifiedDate" => $this->toDateTime($item->modified_date),
                    "pageCount" => empty($item->page_count) ? null : intval($item->page_count), 
                    "language" => $item->language, 
                    "readState" => $item->read_state, 
                    "readNotes" => [
                        "startDate" => $this->toDate($item->read_date_start),
                        "finishDate" => $this->toDate($item->read_date_end),
                        "rating" => empty($item->read_rating) ? null : floatval($item->read_rating), 
                        "comment"=> $item->read_comment,
                        "tags" =>  empty($item->tags) ? [] :  explode(",", $item->tags)
                        
                    ]

                ];
            }

            
            array_push($map[$id]["authors"], [

                "id"=> intval($item->author__id), 
                "firstName" => empty($item->author__first_name) ? null : $item->author__first_name, 
                "middleName" => empty($item->author__middle_name) ? null : $item->author__middle_name, 
                "lastName" => empty($item->author__last_name) ? null : $item->author__last_name
            ]);
            
        }


        
        

        return array_values($map);
    }

    private function toDate($dtString) {
        if(empty($dtString)) {
            return null;
        }
        return substr($dtString, 0, 10);
    }

    private function toDateTime($dtString) {
        if(empty($dtString)) {
            return null;
        }
        return str_replace(" ", "T", $dtString)."Z";
    }

}

/*

"id": "21",
"added_date": "2010-05-08 00:00:00",
"modified_date": "2015-09-19 00:00:00",
"isbn": "",
"title": "Die Mutter",
"publisher": "Berliner Ensemble",
"page_count": "60",
"language": "de",
"read_date_end": "2010-04-08 00:00:00",
"read_date_guessed": "0",
"read_comment": "so toll wie erwartet",
"read_rating": "1.30",
"read_state": "READ",
"tags": "READ_DATE_GUESSED",
"read_date_start": "2017-07-17 00:00:00",
"author__id": "36",
"author__first_name": "Bertolt",
"author__middle_name": "",
"author__last_name": "Brecht"
*/