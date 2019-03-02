module Kind exposing (Model, Msg(..), update, view)

import BodyPattern
import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (value)
import Html.Events exposing (onClick, onInput)
import List.Extra as LE
import Type


type alias Model =
    Type.Kind


type Msg
    = None
    | ChangeName String
    | ChangeBodyPattern Int BodyPattern.Msg
    | AddBodyPattern
    | RemoveBodyPattern Int


view : Model -> Html Msg
view model =
    div []
        (div [] [ input [ value model.name, onInput ChangeName ] [] ] :: div [] [ button [ onClick AddBodyPattern ] [ text "+" ] ] :: (model.bodyPatterns |> List.indexedMap (\i x -> [ button [ onClick (RemoveBodyPattern i) ] [ text "☓" ], x |> BodyPattern.view |> Html.map (ChangeBodyPattern i) ]) |> List.concat))


update : Msg -> Model -> Model
update msg model =
    case msg of
        None ->
            model

        ChangeName s ->
            { model | name = s }

        AddBodyPattern ->
            { model | bodyPatterns = [] :: model.bodyPatterns }

        RemoveBodyPattern i ->
            { model | bodyPatterns = LE.removeAt i model.bodyPatterns }

        ChangeBodyPattern i m ->
            { model | bodyPatterns = LE.updateAt i (BodyPattern.update m) model.bodyPatterns }
