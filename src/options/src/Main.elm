port module Main exposing (Flag, Model, Msg(..), init, main, subscriptions, update, view)

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Card as Card
import Bootstrap.Card.Block as Block
import Bootstrap.Grid as Grid
import Browser
import Html exposing (Html, button, div, hr, input, text)
import Html.Attributes exposing (placeholder, size, style, value)
import Html.Events exposing (onClick, onInput)
import List.Extra as LE
import Site
import Type


port save : List Type.Site -> Cmd msg


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Flag =
    List Type.Site


type alias Model =
    List Type.Site


type Msg
    = ChangeSite Int Site.Msg
    | RemoveSite Int
    | AddSite


init : Flag -> ( Model, Cmd Msg )
init flag =
    ( flag, Cmd.none )


view : Model -> Html Msg
view model =
    Grid.container []
        (CDN.stylesheet
            :: div [] [ Button.button [ Button.onClick AddSite ] [ text "サイトを追加" ] ]
            :: (model
                    |> List.indexedMap
                        (\i x ->
                            Card.config []
                                |> Card.header []
                                    [ Button.button [ Button.onClick (RemoveSite i) ] [ text "☓" ]
                                    ]
                                |> Card.block [] [ Block.text [] [ x |> Site.view |> Html.map (ChangeSite i) ] ]
                                |> Card.view
                        )
               )
        )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        newModel =
            case msg of
                AddSite ->
                    { urlPatterns = [], kinds = [] } :: model

                RemoveSite i ->
                    LE.removeAt i model

                ChangeSite i m ->
                    LE.updateAt i (Site.update m) model
    in
    ( newModel, save newModel )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
