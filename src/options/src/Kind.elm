module Kind exposing (Model, Msg(..), update, view)

import BodyPattern
import Bootstrap.Button as Button
import Bootstrap.Form.Input as Input
import Html exposing (Html, button, div, input, span, text)
import Html.Attributes exposing (placeholder, value)
import Html.Events exposing (onClick, onInput)
import List.Extra as LE
import Type


type alias Model =
    Type.Kind


type Msg
    = ChangeName String
    | ChangeBodyPattern Int BodyPattern.Msg
    | AddBodyPattern
    | RemoveBodyPattern Int


view : Model -> Html Msg
view model =
    span []
        (div [] [ Input.text [ Input.value model.name, Input.onInput ChangeName, Input.placeholder "名前" ] ] :: div [] [ Button.button [ Button.onClick AddBodyPattern ] [ text "and条件を追加" ] ] :: (model.bodyPatterns |> List.indexedMap (\i x -> div [] [ Button.button [ Button.onClick (RemoveBodyPattern i) ] [ text "☓" ], x |> BodyPattern.view |> Html.map (ChangeBodyPattern i) ])))


update : Msg -> Model -> Model
update msg model =
    case msg of
        ChangeName s ->
            { model | name = s }

        AddBodyPattern ->
            { model | bodyPatterns = [] :: model.bodyPatterns }

        RemoveBodyPattern i ->
            { model | bodyPatterns = LE.removeAt i model.bodyPatterns }

        ChangeBodyPattern i m ->
            { model | bodyPatterns = LE.updateAt i (BodyPattern.update m) model.bodyPatterns }
