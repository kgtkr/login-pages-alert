module Site exposing (Model, Msg(..), update, view)

import Html exposing (Html, button, div, hr, input, span, text)
import Html.Attributes exposing (placeholder, style, value)
import Html.Events exposing (onClick, onInput)
import Kind
import List.Extra as LE
import Type
import UrlPattern


type alias Model =
    Type.Site


type Msg
    = ChangeUrlPattern Int UrlPattern.Msg
    | RemoveUrlPattern Int
    | AddUrlPattern
    | ChangeKind Int Kind.Msg
    | RemoveKind Int
    | AddKind


view : Model -> Html Msg
view model =
    span []
        [ div [] (div [] [ button [ onClick AddUrlPattern ] [ text "URLパターンを追加" ] ] :: (model.urlPatterns |> List.indexedMap (\i x -> div [] [ button [ onClick (RemoveUrlPattern i) ] [ text "☓" ], x |> UrlPattern.view |> Html.map (ChangeUrlPattern i) ])))
        , hr [] []
        , div [] (div [] [ button [ onClick AddKind ] [ text "タイプを追加" ] ] :: (model.kinds |> List.indexedMap (\i x -> div [ style "margin-top" "10px" ] [ button [ onClick (RemoveKind i) ] [ text "☓" ], x |> Kind.view |> Html.map (ChangeKind i) ])))
        ]


update : Msg -> Model -> Model
update msg model =
    case msg of
        AddUrlPattern ->
            { model | urlPatterns = { origin = "", pathname = "" } :: model.urlPatterns }

        RemoveUrlPattern i ->
            { model | urlPatterns = LE.removeAt i model.urlPatterns }

        ChangeUrlPattern i m ->
            { model | urlPatterns = LE.updateAt i (UrlPattern.update m) model.urlPatterns }

        AddKind ->
            { model | kinds = { name = "", bodyPatterns = [] } :: model.kinds }

        RemoveKind i ->
            { model | kinds = LE.removeAt i model.kinds }

        ChangeKind i m ->
            { model | kinds = LE.updateAt i (Kind.update m) model.kinds }
