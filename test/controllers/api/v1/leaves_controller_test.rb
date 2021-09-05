require "test_helper"

class Api::V1::LeavesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_leaves_index_url
    assert_response :success
  end
end
