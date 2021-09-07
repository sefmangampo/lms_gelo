require "test_helper"

class Api::V1::PositionControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_position_index_url
    assert_response :success
  end
end
