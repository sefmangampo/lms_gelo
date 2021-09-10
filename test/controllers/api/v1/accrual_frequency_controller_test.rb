require "test_helper"

class Api::V1::AccrualFrequencyControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_accrual_frequency_index_url
    assert_response :success
  end
end
