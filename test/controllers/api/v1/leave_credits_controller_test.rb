require "test_helper"

class Api::V1::LeaveCreditsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_leave_credits_index_url
    assert_response :success
  end
end
