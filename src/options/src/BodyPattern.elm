module BodyPattern exposing (Model, Msg(..), update, view)

import Bootstrap.Button as Button
import Bootstrap.Form.Input as Input
import Html exposing (Html, button, div, input, span, text)
import Html.Attributes exposing (placeholder, value)
import Html.Events exposing (onClick, onInput)
import List.Extra as LE
import Type


type alias Model =
    Type.BodyPattern


type Msg
    = Change Int String
    | Remove Int
    | Add


view : Model -> Html Msg
view model =
    span [] (Button.button [ Button.onClick Add ] [ text "or条件を追加" ] :: (model |> List.indexedMap (\i x -> [ Button.button [ Button.onClick (Remove i) ] [ text "☓" ], Input.text [ Input.value x, Input.onInput (Change i), Input.placeholder "bodyパターン" ] ]) |> List.concat))


update : Msg -> Model -> Model
update msg model =
    case msg of
        Change i s ->
            LE.setAt i s model

        Remove i ->
            LE.removeAt i model

        Add ->
            "" :: model
