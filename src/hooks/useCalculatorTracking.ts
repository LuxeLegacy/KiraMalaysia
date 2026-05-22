import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface TrackCalculationParams {
  calculatorSlug: string;
  calculatorCategory: string;
  inputData: Record<string, unknown>;
  resultData: Record<string, unknown>;
  completed?: boolean;
}

export function useCalculatorTracking() {
  const { user } = useAuth();

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('calc_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('calc_session_id', sessionId);
    }
    return sessionId;
  };

  const trackCalculation = async ({
    calculatorSlug,
    calculatorCategory,
    inputData,
    resultData,
    completed = true,
  }: TrackCalculationParams) => {
    try {
      const sessionId = getSessionId();

      const { error } = await supabase.from('calculator_usage').insert({
        user_id: user?.id || null,
        session_id: sessionId,
        calculator_slug: calculatorSlug,
        calculator_category: calculatorCategory,
        input_data: inputData,
        result_data: resultData,
        completed,
      });

      if (error) {
        console.error('Error tracking calculation:', error);
      }

      if (user) {
        await supabase.rpc('get_user_calculation_count', { user_uuid: user.id });
      }
    } catch (error) {
      console.error('Error in trackCalculation:', error);
    }
  };

  return { trackCalculation };
}
