module UrlPattern exposing (Model, Msg(..), update, view)

import Html exposing (Html, button, div, input, span, text)
import Html.Attributes exposing (placeholder, value)
import Html.Events exposing (onClick, onInput)
import List.Extra as LE
import Type


type alias Model =
    Type.UrlPattern


type Msg
    = ChangeOrigin String
    | ChangePathname String


view : Model -> Html Msg
view model =
    span []
        [ input [ value model.origin, onInput ChangeOrigin, placeholder "origin" ] [], input [ value model.pathname, onInput ChangePathname, placeholder "pathname" ] [] ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        ChangeOrigin s ->
            { model | origin = s }

        ChangePathname s ->
            { model | pathname = s }
