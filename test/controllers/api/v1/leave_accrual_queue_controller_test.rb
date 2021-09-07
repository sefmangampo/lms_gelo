require "test_helper"

class Api::V1::LeaveAccrualQueueControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_leave_accrual_queue_index_url
    assert_response :success
  end
end
