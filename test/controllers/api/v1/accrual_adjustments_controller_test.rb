require "test_helper"

class Api::V1::AccrualAdjustmentsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_accrual_adjustments_index_url
    assert_response :success
  end
end
