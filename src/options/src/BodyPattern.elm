module BodyPattern exposing (update, view)

import Html exposing (Html, button, div, input, text)
import Html.Attributes exposing (value)
import Html.Events exposing (onClick, onInput)
import List.Extra as LE
import Type exposing (BodyPattern)


type alias Model =
    Type.BodyPattern


type Msg
    = None
    | Change Int String
    | Remove Int
    | Add


view : Model -> Html Msg
view model =
    div [] (button [ onClick Add ] [ text "+" ] :: (model |> List.indexedMap (\i x -> [ input [ value x, onInput (Change i) ] [], button [ onClick (Remove i) ] [ text "☓" ] ]) |> List.concat))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( case msg of
        None ->
            model

        Change i s ->
            LE.setAt i s model

        Remove i ->
            LE.removeAt i model

        Add ->
            "" :: model
    , Cmd.none
    )
