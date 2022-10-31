import { TezosToolkit } from '@taquito/taquito';
import * as michelcodec from '@taquito/michel-codec';
import { Parser, ParserOptions } from '@taquito/michel-codec';
import * as fs from 'fs';



const code = `{ parameter
    (or (or (or (pair %balance_of
                   (list %requests (pair (address %owner) (nat %token_id)))
                   (contract %callback
                      (list (pair (pair %request (address %owner) (nat %token_id)) (nat %balance)))))
                (nat %burn))
            (or (pair %mint (bytes %link_to_metadata) (address %owner))
                (list %transfer
                   (pair (address %from_) (list %txs (pair (address %to_) (nat %token_id) (nat %amount)))))))
        (list %update_operators
           (or (pair %add_operator (address %owner) (address %operator) (nat %token_id))
               (pair %remove_operator (address %owner) (address %operator) (nat %token_id))))) ;
  storage
    (pair (pair (pair (address %admin) (big_map %ledger nat address))
                (big_map %metadata string bytes)
                (nat %next_token_id))
          (pair (big_map %operators (pair address address nat) unit)
                (big_map %reverse_ledger address (list nat)))
          (big_map %token_metadata nat (pair (nat %token_id) (map %token_info string bytes)))) ;
  code { PUSH string "FA2_TOKEN_UNDEFINED" ;
         PUSH string "FA2_INSUFFICIENT_BALANCE" ;
         DIG 2 ;
         UNPAIR ;
         IF_LEFT
           { IF_LEFT
               { DIG 2 ;
                 DROP ;
                 IF_LEFT
                   { DUP ;
                     CAR ;
                     MAP { DUP 3 ;
                           CAR ;
                           CAR ;
                           CDR ;
                           DUP 2 ;
                           CDR ;
                           GET ;
                           IF_NONE
                             { DROP ; DUP 3 ; FAILWITH }
                             { DUP 2 ;
                               CAR ;
                               SWAP ;
                               COMPARE ;
                               EQ ;
                               IF { PUSH nat 1 } { PUSH nat 0 } ;
                               SWAP ;
                               PAIR } } ;
                     DIG 3 ;
                     DROP ;
                     SWAP ;
                     CDR ;
                     PUSH mutez 0 ;
                     DIG 2 ;
                     TRANSFER_TOKENS ;
                     SWAP ;
                     NIL operation ;
                     DIG 2 ;
                     CONS }
                   { DIG 2 ;
                     DROP ;
                     DUP 2 ;
                     CAR ;
                     CAR ;
                     CDR ;
                     DUP 2 ;
                     GET ;
                     IF_NONE
                       { PUSH string "UNKNOWN_TOKEN" ; FAILWITH }
                       { SENDER ;
                         SWAP ;
                         COMPARE ;
                         NEQ ;
                         IF { PUSH string "NOT_TOKEN_OWNER" ; FAILWITH }
                            { DUP 2 ; CAR ; CAR ; CDR ; DUP 2 ; NONE address ; SWAP ; UPDATE } } ;
                     SENDER ;
                     DUP 4 ;
                     CDR ;
                     CAR ;
                     CDR ;
                     DUP 2 ;
                     GET ;
                     IF_NONE
                       { DIG 2 ; DROP 2 ; PUSH string "NOT_A_USER" ; FAILWITH }
                       { DUP 5 ;
                         CDR ;
                         CAR ;
                         CDR ;
                         NIL nat ;
                         DIG 2 ;
                         ITER { SWAP ;
                                DUP 6 ;
                                DUP 3 ;
                                COMPARE ;
                                EQ ;
                                IF { SWAP ; DROP } { SWAP ; CONS } } ;
                         DIG 4 ;
                         DROP ;
                         SOME ;
                         DIG 2 ;
                         UPDATE } ;
                     DUP 3 ;
                     CDR ;
                     DUP 4 ;
                     CAR ;
                     CDR ;
                     DIG 3 ;
                     DIG 4 ;
                     CAR ;
                     CAR ;
                     CAR ;
                     PAIR ;
                     PAIR ;
                     PAIR ;
                     DUP ;
                     CDR ;
                     CDR ;
                     DIG 2 ;
                     DUP 3 ;
                     CDR ;
                     CAR ;
                     CAR ;
                     PAIR ;
                     PAIR ;
                     SWAP ;
                     CAR ;
                     PAIR ;
                     NIL operation } }
               { IF_LEFT
                   { DIG 2 ;
                     DIG 3 ;
                     DROP 2 ;
                     UNPAIR ;
                     DUP 3 ;
                     CAR ;
                     CDR ;
                     CDR ;
                     DUP 4 ;
                     CDR ;
                     DUP 5 ;
                     CAR ;
                     CDR ;
                     DUP 6 ;
                     CAR ;
                     CAR ;
                     CDR ;
                     DUP 6 ;
                     DUP 5 ;
                     SWAP ;
                     SOME ;
                     SWAP ;
                     UPDATE ;
                     DUP 7 ;
                     CAR ;
                     CAR ;
                     CAR ;
                     PAIR ;
                     PAIR ;
                     PAIR ;
                     DUP ;
                     CDR ;
                     CDR ;
                     DUP 6 ;
                     CDR ;
                     CAR ;
                     CDR ;
                     DUP 6 ;
                     GET ;
                     IF_NONE
                       { DUP 6 ;
                         CDR ;
                         CAR ;
                         CDR ;
                         NIL nat ;
                         DUP 5 ;
                         CONS ;
                         DIG 6 ;
                         SWAP ;
                         SOME ;
                         SWAP ;
                         UPDATE }
                       { DUP 7 ; CDR ; CAR ; CDR ; SWAP ; DUP 5 ; CONS ; SOME ; DIG 6 ; UPDATE } ;
                     DUP 3 ;
                     CDR ;
                     CAR ;
                     CAR ;
                     PAIR ;
                     PAIR ;
                     SWAP ;
                     CAR ;
                     PAIR ;
                     DIG 3 ;
                     CDR ;
                     CDR ;
                     EMPTY_MAP string bytes ;
                     DIG 4 ;
                     SOME ;
                     PUSH string "" ;
                     UPDATE ;
                     DUP 4 ;
                     PAIR ;
                     DUP 4 ;
                     SWAP ;
                     SOME ;
                     SWAP ;
                     UPDATE ;
                     DUP 2 ;
                     CDR ;
                     CAR ;
                     PAIR ;
                     SWAP ;
                     CAR ;
                     PAIR ;
                     DUP ;
                     CDR ;
                     PUSH nat 1 ;
                     DIG 3 ;
                     ADD ;
                     DUP 3 ;
                     CAR ;
                     CDR ;
                     CAR ;
                     PAIR ;
                     DIG 2 ;
                     CAR ;
                     CAR ;
                     PAIR }
                   { DUP 2 ;
                     CDR ;
                     CAR ;
                     CDR ;
                     DUP 3 ;
                     CAR ;
                     CAR ;
                     CDR ;
                     PAIR ;
                     SWAP ;
                     ITER { SWAP ;
                            DUP 2 ;
                            CDR ;
                            ITER { SWAP ;
                                   UNPAIR ;
                                   PUSH nat 0 ;
                                   DUP 4 ;
                                   GET 4 ;
                                   COMPARE ;
                                   EQ ;
                                   IF { DIG 2 ; DROP ; PAIR }
                                      { PUSH nat 1 ;
                                        DUP 4 ;
                                        GET 4 ;
                                        COMPARE ;
                                        NEQ ;
                                        IF { DROP 3 ; DUP 3 ; FAILWITH }
                                           { DUP ;
                                             DUP 4 ;
                                             GET 3 ;
                                             GET ;
                                             IF_NONE
                                               { DROP 3 ; DUP 4 ; FAILWITH }
                                               { DUP 5 ;
                                                 CAR ;
                                                 DUP 2 ;
                                                 COMPARE ;
                                                 NEQ ;
                                                 IF { DROP 4 ; DUP 3 ; FAILWITH }
                                                    { DUP 6 ;
                                                      CDR ;
                                                      CAR ;
                                                      CAR ;
                                                      DUP 5 ;
                                                      GET 3 ;
                                                      PAIR ;
                                                      SENDER ;
                                                      DUG 2 ;
                                                      UNPAIR ;
                                                      DUP 4 ;
                                                      DUP 4 ;
                                                      COMPARE ;
                                                      EQ ;
                                                      IF { DROP 4 }
                                                         { DIG 3 ;
                                                           PAIR ;
                                                           DIG 2 ;
                                                           PAIR ;
                                                           MEM ;
                                                           IF {} { PUSH string "FA2_NOT_OPERATOR" ; FAILWITH } } ;
                                                      DUP 2 ;
                                                      DUP 5 ;
                                                      CAR ;
                                                      GET ;
                                                      IF_NONE
                                                        { SWAP ; DROP ; DUP 5 ; FAILWITH }
                                                        { DIG 2 ;
                                                          NIL nat ;
                                                          DIG 2 ;
                                                          ITER { SWAP ;
                                                                 DUP 5 ;
                                                                 GET 3 ;
                                                                 DUP 3 ;
                                                                 COMPARE ;
                                                                 EQ ;
                                                                 IF { SWAP ; DROP } { SWAP ; CONS } } ;
                                                          SOME ;
                                                          DUP 5 ;
                                                          CAR ;
                                                          UPDATE } ;
                                                      DUP ;
                                                      DUP 4 ;
                                                      CAR ;
                                                      GET ;
                                                      IF_NONE
                                                        { NIL nat ;
                                                          DUP 4 ;
                                                          GET 3 ;
                                                          CONS ;
                                                          DUP 4 ;
                                                          CAR ;
                                                          SWAP ;
                                                          SOME ;
                                                          SWAP ;
                                                          UPDATE }
                                                        { DUP 4 ; GET 3 ; CONS ; SOME ; DUP 4 ; CAR ; UPDATE } ;
                                                      SWAP ;
                                                      DUP 3 ;
                                                      CAR ;
                                                      SOME ;
                                                      DIG 3 ;
                                                      GET 3 ;
                                                      UPDATE ;
                                                      PAIR } } } } } ;
                            SWAP ;
                            DROP } ;
                     DIG 2 ;
                     DIG 3 ;
                     DROP 2 ;
                     UNPAIR ;
                     DUP 3 ;
                     CDR ;
                     DUP 4 ;
                     CAR ;
                     CDR ;
                     DIG 2 ;
                     DIG 4 ;
                     CAR ;
                     CAR ;
                     CAR ;
                     PAIR ;
                     PAIR ;
                     PAIR ;
                     DUP ;
                     CDR ;
                     CDR ;
                     DIG 2 ;
                     DUP 3 ;
                     CDR ;
                     CAR ;
                     CAR ;
                     PAIR ;
                     PAIR ;
                     SWAP ;
                     CAR } ;
                 PAIR ;
                 NIL operation } }
           { DIG 2 ;
             DIG 3 ;
             DROP 2 ;
             SENDER ;
             DUP 3 ;
             CDR ;
             CAR ;
             CAR ;
             DIG 2 ;
             ITER { SWAP ;
                    DUP 3 ;
                    DUP 3 ;
                    IF_LEFT {} {} ;
                    CAR ;
                    COMPARE ;
                    EQ ;
                    IF {} { PUSH string "FA2_NOT_OWNER" ; FAILWITH } ;
                    SWAP ;
                    IF_LEFT
                      { SWAP ;
                        UNIT ;
                        SOME ;
                        DUP 3 ;
                        GET 4 ;
                        DUP 4 ;
                        GET 3 ;
                        PAIR ;
                        DIG 3 ;
                        CAR ;
                        PAIR ;
                        UPDATE }
                      { SWAP ;
                        DUP 2 ;
                        GET 4 ;
                        DUP 3 ;
                        GET 3 ;
                        PAIR ;
                        DIG 2 ;
                        CAR ;
                        PAIR ;
                        NONE unit ;
                        SWAP ;
                        UPDATE } } ;
             SWAP ;
             DROP ;
             DUP 2 ;
             CDR ;
             CDR ;
             DUP 3 ;
             CDR ;
             CAR ;
             CDR ;
             DIG 2 ;
             PAIR ;
             PAIR ;
             SWAP ;
             CAR ;
             PAIR ;
             NIL operation } ;
         PAIR } }`;

const p = new Parser();
const result = p.parseMichelineExpression(code);

var fss = require('fs');
let json = JSON.stringify(result);
fss.writeFile('fa2_nft-mich.json', json);



