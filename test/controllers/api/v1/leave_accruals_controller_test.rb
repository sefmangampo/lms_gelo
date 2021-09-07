require "test_helper"

class Api::V1::LeaveAccrualsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_leave_accruals_index_url
    assert_response :success
  end
end
