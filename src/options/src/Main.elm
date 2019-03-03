module Main exposing (Flag, Model, Msg(..), init, main, subscriptions, update, view)

import Browser
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (placeholder, value)
import Html.Events exposing (onClick, onInput)
import List.Extra as LE
import Site
import Type


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


type alias Flag =
    {}


type alias Model =
    List Type.Site


type Msg
    = ChangeSite Int Site.Msg
    | RemoveSite Int
    | AddSite


init : Flag -> ( Model, Cmd Msg )
init flag =
    ( [], Cmd.none )


view : Model -> Html Msg
view model =
    div [] (div [] [ button [ onClick AddSite ] [ text "+" ] ] :: (model |> List.indexedMap (\i x -> [ button [ onClick (RemoveSite i) ] [ text "☓" ], x |> Site.view |> Html.map (ChangeSite i) ]) |> List.concat))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( case msg of
        AddSite ->
            { urlPatterns = [], kinds = [] } :: model

        RemoveSite i ->
            LE.removeAt i model

        ChangeSite i m ->
            LE.updateAt i (Site.update m) model
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
