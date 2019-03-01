import Browser
import Html exposing (div,Html)


main =
  Browser.element { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }

type alias Flag={}
type alias Model={}
type Msg=None

init:Flag->(Model,Cmd Msg)
init flag=({},Cmd.none)

view:Model->Html Msg
view model=div [] []

update:Msg->Model->(Model,Cmd Msg)
update msg model=(model,Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none