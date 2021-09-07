require "test_helper"

class Api::V1::UndertimeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_undertime_index_url
    assert_response :success
  end
end
