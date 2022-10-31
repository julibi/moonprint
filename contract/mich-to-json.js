"use strict";
exports.__esModule = true;
var michel_codec_1 = require("@taquito/michel-codec");
var code = "{ parameter\n    (or (or (or (pair %balance_of\n                   (list %requests (pair (address %owner) (nat %token_id)))\n                   (contract %callback\n                      (list (pair (pair %request (address %owner) (nat %token_id)) (nat %balance)))))\n                (nat %burn))\n            (or (pair %mint (bytes %link_to_metadata) (address %owner))\n                (list %transfer\n                   (pair (address %from_) (list %txs (pair (address %to_) (nat %token_id) (nat %amount)))))))\n        (list %update_operators\n           (or (pair %add_operator (address %owner) (address %operator) (nat %token_id))\n               (pair %remove_operator (address %owner) (address %operator) (nat %token_id))))) ;\n  storage\n    (pair (pair (pair (address %admin) (big_map %ledger nat address))\n                (big_map %metadata string bytes)\n                (nat %next_token_id))\n          (pair (big_map %operators (pair address address nat) unit)\n                (big_map %reverse_ledger address (list nat)))\n          (big_map %token_metadata nat (pair (nat %token_id) (map %token_info string bytes)))) ;\n  code { PUSH string \"FA2_TOKEN_UNDEFINED\" ;\n         PUSH string \"FA2_INSUFFICIENT_BALANCE\" ;\n         DIG 2 ;\n         UNPAIR ;\n         IF_LEFT\n           { IF_LEFT\n               { DIG 2 ;\n                 DROP ;\n                 IF_LEFT\n                   { DUP ;\n                     CAR ;\n                     MAP { DUP 3 ;\n                           CAR ;\n                           CAR ;\n                           CDR ;\n                           DUP 2 ;\n                           CDR ;\n                           GET ;\n                           IF_NONE\n                             { DROP ; DUP 3 ; FAILWITH }\n                             { DUP 2 ;\n                               CAR ;\n                               SWAP ;\n                               COMPARE ;\n                               EQ ;\n                               IF { PUSH nat 1 } { PUSH nat 0 } ;\n                               SWAP ;\n                               PAIR } } ;\n                     DIG 3 ;\n                     DROP ;\n                     SWAP ;\n                     CDR ;\n                     PUSH mutez 0 ;\n                     DIG 2 ;\n                     TRANSFER_TOKENS ;\n                     SWAP ;\n                     NIL operation ;\n                     DIG 2 ;\n                     CONS }\n                   { DIG 2 ;\n                     DROP ;\n                     DUP 2 ;\n                     CAR ;\n                     CAR ;\n                     CDR ;\n                     DUP 2 ;\n                     GET ;\n                     IF_NONE\n                       { PUSH string \"UNKNOWN_TOKEN\" ; FAILWITH }\n                       { SENDER ;\n                         SWAP ;\n                         COMPARE ;\n                         NEQ ;\n                         IF { PUSH string \"NOT_TOKEN_OWNER\" ; FAILWITH }\n                            { DUP 2 ; CAR ; CAR ; CDR ; DUP 2 ; NONE address ; SWAP ; UPDATE } } ;\n                     SENDER ;\n                     DUP 4 ;\n                     CDR ;\n                     CAR ;\n                     CDR ;\n                     DUP 2 ;\n                     GET ;\n                     IF_NONE\n                       { DIG 2 ; DROP 2 ; PUSH string \"NOT_A_USER\" ; FAILWITH }\n                       { DUP 5 ;\n                         CDR ;\n                         CAR ;\n                         CDR ;\n                         NIL nat ;\n                         DIG 2 ;\n                         ITER { SWAP ;\n                                DUP 6 ;\n                                DUP 3 ;\n                                COMPARE ;\n                                EQ ;\n                                IF { SWAP ; DROP } { SWAP ; CONS } } ;\n                         DIG 4 ;\n                         DROP ;\n                         SOME ;\n                         DIG 2 ;\n                         UPDATE } ;\n                     DUP 3 ;\n                     CDR ;\n                     DUP 4 ;\n                     CAR ;\n                     CDR ;\n                     DIG 3 ;\n                     DIG 4 ;\n                     CAR ;\n                     CAR ;\n                     CAR ;\n                     PAIR ;\n                     PAIR ;\n                     PAIR ;\n                     DUP ;\n                     CDR ;\n                     CDR ;\n                     DIG 2 ;\n                     DUP 3 ;\n                     CDR ;\n                     CAR ;\n                     CAR ;\n                     PAIR ;\n                     PAIR ;\n                     SWAP ;\n                     CAR ;\n                     PAIR ;\n                     NIL operation } }\n               { IF_LEFT\n                   { DIG 2 ;\n                     DIG 3 ;\n                     DROP 2 ;\n                     UNPAIR ;\n                     DUP 3 ;\n                     CAR ;\n                     CDR ;\n                     CDR ;\n                     DUP 4 ;\n                     CDR ;\n                     DUP 5 ;\n                     CAR ;\n                     CDR ;\n                     DUP 6 ;\n                     CAR ;\n                     CAR ;\n                     CDR ;\n                     DUP 6 ;\n                     DUP 5 ;\n                     SWAP ;\n                     SOME ;\n                     SWAP ;\n                     UPDATE ;\n                     DUP 7 ;\n                     CAR ;\n                     CAR ;\n                     CAR ;\n                     PAIR ;\n                     PAIR ;\n                     PAIR ;\n                     DUP ;\n                     CDR ;\n                     CDR ;\n                     DUP 6 ;\n                     CDR ;\n                     CAR ;\n                     CDR ;\n                     DUP 6 ;\n                     GET ;\n                     IF_NONE\n                       { DUP 6 ;\n                         CDR ;\n                         CAR ;\n                         CDR ;\n                         NIL nat ;\n                         DUP 5 ;\n                         CONS ;\n                         DIG 6 ;\n                         SWAP ;\n                         SOME ;\n                         SWAP ;\n                         UPDATE }\n                       { DUP 7 ; CDR ; CAR ; CDR ; SWAP ; DUP 5 ; CONS ; SOME ; DIG 6 ; UPDATE } ;\n                     DUP 3 ;\n                     CDR ;\n                     CAR ;\n                     CAR ;\n                     PAIR ;\n                     PAIR ;\n                     SWAP ;\n                     CAR ;\n                     PAIR ;\n                     DIG 3 ;\n                     CDR ;\n                     CDR ;\n                     EMPTY_MAP string bytes ;\n                     DIG 4 ;\n                     SOME ;\n                     PUSH string \"\" ;\n                     UPDATE ;\n                     DUP 4 ;\n                     PAIR ;\n                     DUP 4 ;\n                     SWAP ;\n                     SOME ;\n                     SWAP ;\n                     UPDATE ;\n                     DUP 2 ;\n                     CDR ;\n                     CAR ;\n                     PAIR ;\n                     SWAP ;\n                     CAR ;\n                     PAIR ;\n                     DUP ;\n                     CDR ;\n                     PUSH nat 1 ;\n                     DIG 3 ;\n                     ADD ;\n                     DUP 3 ;\n                     CAR ;\n                     CDR ;\n                     CAR ;\n                     PAIR ;\n                     DIG 2 ;\n                     CAR ;\n                     CAR ;\n                     PAIR }\n                   { DUP 2 ;\n                     CDR ;\n                     CAR ;\n                     CDR ;\n                     DUP 3 ;\n                     CAR ;\n                     CAR ;\n                     CDR ;\n                     PAIR ;\n                     SWAP ;\n                     ITER { SWAP ;\n                            DUP 2 ;\n                            CDR ;\n                            ITER { SWAP ;\n                                   UNPAIR ;\n                                   PUSH nat 0 ;\n                                   DUP 4 ;\n                                   GET 4 ;\n                                   COMPARE ;\n                                   EQ ;\n                                   IF { DIG 2 ; DROP ; PAIR }\n                                      { PUSH nat 1 ;\n                                        DUP 4 ;\n                                        GET 4 ;\n                                        COMPARE ;\n                                        NEQ ;\n                                        IF { DROP 3 ; DUP 3 ; FAILWITH }\n                                           { DUP ;\n                                             DUP 4 ;\n                                             GET 3 ;\n                                             GET ;\n                                             IF_NONE\n                                               { DROP 3 ; DUP 4 ; FAILWITH }\n                                               { DUP 5 ;\n                                                 CAR ;\n                                                 DUP 2 ;\n                                                 COMPARE ;\n                                                 NEQ ;\n                                                 IF { DROP 4 ; DUP 3 ; FAILWITH }\n                                                    { DUP 6 ;\n                                                      CDR ;\n                                                      CAR ;\n                                                      CAR ;\n                                                      DUP 5 ;\n                                                      GET 3 ;\n                                                      PAIR ;\n                                                      SENDER ;\n                                                      DUG 2 ;\n                                                      UNPAIR ;\n                                                      DUP 4 ;\n                                                      DUP 4 ;\n                                                      COMPARE ;\n                                                      EQ ;\n                                                      IF { DROP 4 }\n                                                         { DIG 3 ;\n                                                           PAIR ;\n                                                           DIG 2 ;\n                                                           PAIR ;\n                                                           MEM ;\n                                                           IF {} { PUSH string \"FA2_NOT_OPERATOR\" ; FAILWITH } } ;\n                                                      DUP 2 ;\n                                                      DUP 5 ;\n                                                      CAR ;\n                                                      GET ;\n                                                      IF_NONE\n                                                        { SWAP ; DROP ; DUP 5 ; FAILWITH }\n                                                        { DIG 2 ;\n                                                          NIL nat ;\n                                                          DIG 2 ;\n                                                          ITER { SWAP ;\n                                                                 DUP 5 ;\n                                                                 GET 3 ;\n                                                                 DUP 3 ;\n                                                                 COMPARE ;\n                                                                 EQ ;\n                                                                 IF { SWAP ; DROP } { SWAP ; CONS } } ;\n                                                          SOME ;\n                                                          DUP 5 ;\n                                                          CAR ;\n                                                          UPDATE } ;\n                                                      DUP ;\n                                                      DUP 4 ;\n                                                      CAR ;\n                                                      GET ;\n                                                      IF_NONE\n                                                        { NIL nat ;\n                                                          DUP 4 ;\n                                                          GET 3 ;\n                                                          CONS ;\n                                                          DUP 4 ;\n                                                          CAR ;\n                                                          SWAP ;\n                                                          SOME ;\n                                                          SWAP ;\n                                                          UPDATE }\n                                                        { DUP 4 ; GET 3 ; CONS ; SOME ; DUP 4 ; CAR ; UPDATE } ;\n                                                      SWAP ;\n                                                      DUP 3 ;\n                                                      CAR ;\n                                                      SOME ;\n                                                      DIG 3 ;\n                                                      GET 3 ;\n                                                      UPDATE ;\n                                                      PAIR } } } } } ;\n                            SWAP ;\n                            DROP } ;\n                     DIG 2 ;\n                     DIG 3 ;\n                     DROP 2 ;\n                     UNPAIR ;\n                     DUP 3 ;\n                     CDR ;\n                     DUP 4 ;\n                     CAR ;\n                     CDR ;\n                     DIG 2 ;\n                     DIG 4 ;\n                     CAR ;\n                     CAR ;\n                     CAR ;\n                     PAIR ;\n                     PAIR ;\n                     PAIR ;\n                     DUP ;\n                     CDR ;\n                     CDR ;\n                     DIG 2 ;\n                     DUP 3 ;\n                     CDR ;\n                     CAR ;\n                     CAR ;\n                     PAIR ;\n                     PAIR ;\n                     SWAP ;\n                     CAR } ;\n                 PAIR ;\n                 NIL operation } }\n           { DIG 2 ;\n             DIG 3 ;\n             DROP 2 ;\n             SENDER ;\n             DUP 3 ;\n             CDR ;\n             CAR ;\n             CAR ;\n             DIG 2 ;\n             ITER { SWAP ;\n                    DUP 3 ;\n                    DUP 3 ;\n                    IF_LEFT {} {} ;\n                    CAR ;\n                    COMPARE ;\n                    EQ ;\n                    IF {} { PUSH string \"FA2_NOT_OWNER\" ; FAILWITH } ;\n                    SWAP ;\n                    IF_LEFT\n                      { SWAP ;\n                        UNIT ;\n                        SOME ;\n                        DUP 3 ;\n                        GET 4 ;\n                        DUP 4 ;\n                        GET 3 ;\n                        PAIR ;\n                        DIG 3 ;\n                        CAR ;\n                        PAIR ;\n                        UPDATE }\n                      { SWAP ;\n                        DUP 2 ;\n                        GET 4 ;\n                        DUP 3 ;\n                        GET 3 ;\n                        PAIR ;\n                        DIG 2 ;\n                        CAR ;\n                        PAIR ;\n                        NONE unit ;\n                        SWAP ;\n                        UPDATE } } ;\n             SWAP ;\n             DROP ;\n             DUP 2 ;\n             CDR ;\n             CDR ;\n             DUP 3 ;\n             CDR ;\n             CAR ;\n             CDR ;\n             DIG 2 ;\n             PAIR ;\n             PAIR ;\n             SWAP ;\n             CAR ;\n             PAIR ;\n             NIL operation } ;\n         PAIR } }";
var p = new michel_codec_1.Parser();
var myresult = p.parseMichelineExpression(code);
var fss = require('fs');
var json = JSON.stringify(myresult);
fss.writeFile('fa2_nft-mich.json', json, function (err, result) {
    if (err)
        console.log('error', err);
    console.log("result..", result);
});
