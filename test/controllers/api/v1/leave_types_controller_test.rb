require "test_helper"

class Api::V1::LeaveTypesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_leave_types_index_url
    assert_response :success
  end
end
